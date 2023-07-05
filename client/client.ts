import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './gRPC/test'
import { networkInterfaces } from 'os'
import dgram from 'node:dgram';

const PROTO_FILE_PATH = "../gRPC/test.proto"
const nets = networkInterfaces()

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE_PATH), {
    keepCase: true,
    enums: String
})
const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType


for (let i = 40000; i <= 40000; i++) {
    const client = new grpcObj.test.Test(
        `172.218.0.10:8080`,
        grpc.credentials.createInsecure()
    )

    let metadata = new grpc.Metadata()
    metadata.add("src-ip", nets.eth0!![0].address)
    metadata.add("src-port", "5555")
    metadata.add("dst-ip", "172.218.0.11")
    metadata.add("dst-port", `${i}`)
    metadata.add("protocol", "tcp")
    
    client.ping({}, metadata, (err, result) => {
        if(err) {
            console.log(err)
        }
        console.log(result)    
    })
}

///////////////////// UDP ////////////////////

const clientUDP = dgram.createSocket('udp4');

clientUDP.bind(3333)
const msg = "ping"
clientUDP.send(msg, 0, msg.length, 56000, "172.218.0.11", (err, bytes) => {
    if (err) {
        console.log(err)
        clientUDP.close()
    }
    console.log(bytes)
    console.log(msg.length === bytes)
    clientUDP.close()
})