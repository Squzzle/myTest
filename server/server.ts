import path from 'path'
import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { ProtoGrpcType } from './gRPC/test'
import dgram from 'node:dgram';

const PROTO_FILE_PATH = "../gRPC/test.proto"
const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE_PATH), {
    keepCase: true
})

const grpcObj = (grpc.loadPackageDefinition(packageDef) as unknown) as ProtoGrpcType        

const serverTCP = new grpc.Server();

serverTCP.addService(grpcObj.test.Test.service, {
    ping: (res: any, req: Function) => {
        // const srcPort = res.getPeer().split(":")[1]
        const srcPort = res.metadata.internalRepr.get('src-port')[0]
        const dstPort = res.metadata.internalRepr.get('dst-port')[0]
        req(null, {  msg: "OK", src_port: srcPort, dst_port: dstPort })
    }
});

/////// UDP //////

const serverUDP = dgram.createSocket('udp4')

serverUDP.on('error', err => {
    console.log(`server error: \n${err.stack}`)
})

serverUDP.on('message', (msg, rinfo) => {
    console.log(rinfo)
    console.log(`server GOT: ${msg} from ${rinfo.address}:${rinfo.port}`)
})

serverUDP.on('listening', () => {
    const address = serverUDP.address()
    console.log(`server listening ${address.address}:${address.port}`);
})


;
(async () => {
        serverTCP.bindAsync(
            `0.0.0.0:9091`,
            grpc.ServerCredentials.createInsecure(),
            err => {
                if (err) {
                    console.log(err)
                    return
                }
                serverTCP.start()
                console.log(`Server start successfully!`)
            }
        );

        serverUDP.bind(9092);
})();
