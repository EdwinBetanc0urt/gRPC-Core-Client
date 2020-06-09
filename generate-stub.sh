# Generate Stub to base_data_type.proto file
protoc proto/base_data_type.proto \
--js_out=import_style=commonjs:src/grpc \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/grpc


# Generate Stub to core_functionality.proto file
protoc proto/core_functionality.proto \
--js_out=import_style=commonjs:src/grpc \
--grpc-web_out=import_style=commonjs,mode=grpcwebtext:src/grpc
