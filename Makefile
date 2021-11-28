schemeFolders=(rest ws)
schemes=(rest/me rest/code rest/redirect ws/message)

.PHONY: protobuf
protobuf:
	@mkdir -p model/pb
	@mkdir -p client/src/pb
	protoc --proto_path=schema/pb --go_out=model/pb --go_opt=paths=source_relative schema/pb/**/*.proto
	@cd client && npm run gen
	@protoc --doc_out=html,pb_schema.html:schema schema/pb/**/*.proto
