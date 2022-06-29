import { Table, Tag, Button } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getUserAPI } from "../redux/actions/userAction";

export default function AdminUserPage(props) {
  const dispatch = useDispatch();
  const { userList } = useSelector((root) => root.userReducer);

  useEffect(() => {
    dispatch(getUserAPI());
  }, []);

  if (props.history.action !== "PUSH") {
    return <Redirect to="/admin" />;
  }

  const tableColumns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      render: (_, record) => {
        const color = record.type === "ADMIN" ? "blue" : "green";
        if (record.type) {
          return (
            <Tag color={color} key={record._id}>
              {record.type}
            </Tag>
          );
        } else {
          return <></>;
        }
      },
    },
    {
      title: "",
      key: "action",
      render: (_, record) => {
        return (
          <Button
            type="primary"
            onClick={() => {
              props.history.push("/user/" + record._id);
            }}
          >
            Xem chi tiết
          </Button>
        );
      },
    },
  ];

  const renderUserList = () => {
    return (
      <div className="user-list">
        <Table columns={tableColumns} dataSource={userList} bordered />
      </div>
    );
  };

  return (
    <div className="admin-user-page">
      <div className="container">{renderUserList()}</div>
    </div>
  );
}
