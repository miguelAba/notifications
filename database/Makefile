TS_PROTO_FLAGS = --ts_proto_out=./ --ts_proto_opt=esModuleInterop=false --ts_proto_opt=outputEncodeMethods=false --ts_proto_opt=outputJsonMethods=false --ts_proto_opt=outputPartialMethods=false --ts_proto_opt=outputClientImpl=false

db:
	@echo "Building database..."
	@echo "compile protos files..."
	@protoc --proto_path=./ ./src/v1/proto/*.proto $(TS_PROTO_FLAGS)
	
	
build:
	@echo "dockerize the mycorservice..."
	@docker build -t notifications-database .
	@echo "run the postgres..."
	@docker run -d --name notifications-postgres --rm -e POSTGRES_PASSWORD=pass -p 5432:5432 postgres
	@echo "run the mycorservice..."
	@docker run -d --name notifications-database --rm -p 8082:8082 notifications-database
	@echo "done!"