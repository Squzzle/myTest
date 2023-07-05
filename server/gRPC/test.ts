import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { TestClient as _test_TestClient, TestDefinition as _test_TestDefinition } from './test/Test';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Empty: MessageTypeDefinition
    }
  }
  test: {
    Test: SubtypeConstructor<typeof grpc.Client, _test_TestClient> & { service: _test_TestDefinition }
    pingResponse: MessageTypeDefinition
  }
}

