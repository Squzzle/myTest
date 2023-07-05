// Original file: gRPC/test.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { Empty as _google_protobuf_Empty, Empty__Output as _google_protobuf_Empty__Output } from '../google/protobuf/Empty';
import type { pingResponse as _test_pingResponse, pingResponse__Output as _test_pingResponse__Output } from '../test/pingResponse';

export interface TestClient extends grpc.Client {
  ping(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _google_protobuf_Empty, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _google_protobuf_Empty, metadata: grpc.Metadata, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _google_protobuf_Empty, options: grpc.CallOptions, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  ping(argument: _google_protobuf_Empty, callback: grpc.requestCallback<_test_pingResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface TestHandlers extends grpc.UntypedServiceImplementation {
  ping: grpc.handleUnaryCall<_google_protobuf_Empty__Output, _test_pingResponse>;
  
}

export interface TestDefinition extends grpc.ServiceDefinition {
  ping: MethodDefinition<_google_protobuf_Empty, _test_pingResponse, _google_protobuf_Empty__Output, _test_pingResponse__Output>
}
