TS_PROTO_FLAGS = --ts_proto_out=./ --ts_proto_opt=esModuleInterop=false --ts_proto_opt=outputEncodeMethods=false --ts_proto_opt=outputJsonMethods=false --ts_proto_opt=outputPartialMethods=false --ts_proto_opt=outputClientImpl=false

db:
	@echo "Building dm..."
	@protoc --proto_path=./ ./src/v1/proto/*.proto $(TS_PROTO_FLAGS)


postgres:
	@echo "run postgres..."
	@docker run --name postgres -e POSTGRES_PASSWORD=pass -p 5432:5432 -d postgres