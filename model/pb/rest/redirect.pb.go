// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.27.1
// 	protoc        v3.19.1
// source: rest/redirect.proto

package rest

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type GetRedirectResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields

	RedirectUri string `protobuf:"bytes,1,opt,name=redirect_uri,json=redirectUri,proto3" json:"redirect_uri,omitempty"`
}

func (x *GetRedirectResponse) Reset() {
	*x = GetRedirectResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_rest_redirect_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *GetRedirectResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*GetRedirectResponse) ProtoMessage() {}

func (x *GetRedirectResponse) ProtoReflect() protoreflect.Message {
	mi := &file_rest_redirect_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use GetRedirectResponse.ProtoReflect.Descriptor instead.
func (*GetRedirectResponse) Descriptor() ([]byte, []int) {
	return file_rest_redirect_proto_rawDescGZIP(), []int{0}
}

func (x *GetRedirectResponse) GetRedirectUri() string {
	if x != nil {
		return x.RedirectUri
	}
	return ""
}

var File_rest_redirect_proto protoreflect.FileDescriptor

var file_rest_redirect_proto_rawDesc = []byte{
	0x0a, 0x13, 0x72, 0x65, 0x73, 0x74, 0x2f, 0x72, 0x65, 0x64, 0x69, 0x72, 0x65, 0x63, 0x74, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x22, 0x38, 0x0a, 0x13, 0x47, 0x65, 0x74, 0x52, 0x65, 0x64, 0x69,
	0x72, 0x65, 0x63, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x21, 0x0a, 0x0c,
	0x72, 0x65, 0x64, 0x69, 0x72, 0x65, 0x63, 0x74, 0x5f, 0x75, 0x72, 0x69, 0x18, 0x01, 0x20, 0x01,
	0x28, 0x09, 0x52, 0x0b, 0x72, 0x65, 0x64, 0x69, 0x72, 0x65, 0x63, 0x74, 0x55, 0x72, 0x69, 0x42,
	0x42, 0x5a, 0x40, 0x67, 0x69, 0x74, 0x68, 0x75, 0x62, 0x2e, 0x63, 0x6f, 0x6d, 0x2f, 0x68, 0x61,
	0x63, 0x6b, 0x61, 0x74, 0x68, 0x6f, 0x6e, 0x2d, 0x32, 0x31, 0x77, 0x69, 0x6e, 0x74, 0x65, 0x72,
	0x2d, 0x30, 0x35, 0x2f, 0x6f, 0x61, 0x75, 0x74, 0x68, 0x5f, 0x77, 0x73, 0x5f, 0x70, 0x72, 0x61,
	0x63, 0x74, 0x69, 0x63, 0x65, 0x2f, 0x6d, 0x6f, 0x64, 0x65, 0x6c, 0x2f, 0x70, 0x62, 0x2f, 0x72,
	0x65, 0x73, 0x74, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_rest_redirect_proto_rawDescOnce sync.Once
	file_rest_redirect_proto_rawDescData = file_rest_redirect_proto_rawDesc
)

func file_rest_redirect_proto_rawDescGZIP() []byte {
	file_rest_redirect_proto_rawDescOnce.Do(func() {
		file_rest_redirect_proto_rawDescData = protoimpl.X.CompressGZIP(file_rest_redirect_proto_rawDescData)
	})
	return file_rest_redirect_proto_rawDescData
}

var file_rest_redirect_proto_msgTypes = make([]protoimpl.MessageInfo, 1)
var file_rest_redirect_proto_goTypes = []interface{}{
	(*GetRedirectResponse)(nil), // 0: GetRedirectResponse
}
var file_rest_redirect_proto_depIdxs = []int32{
	0, // [0:0] is the sub-list for method output_type
	0, // [0:0] is the sub-list for method input_type
	0, // [0:0] is the sub-list for extension type_name
	0, // [0:0] is the sub-list for extension extendee
	0, // [0:0] is the sub-list for field type_name
}

func init() { file_rest_redirect_proto_init() }
func file_rest_redirect_proto_init() {
	if File_rest_redirect_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_rest_redirect_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*GetRedirectResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_rest_redirect_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   1,
			NumExtensions: 0,
			NumServices:   0,
		},
		GoTypes:           file_rest_redirect_proto_goTypes,
		DependencyIndexes: file_rest_redirect_proto_depIdxs,
		MessageInfos:      file_rest_redirect_proto_msgTypes,
	}.Build()
	File_rest_redirect_proto = out.File
	file_rest_redirect_proto_rawDesc = nil
	file_rest_redirect_proto_goTypes = nil
	file_rest_redirect_proto_depIdxs = nil
}