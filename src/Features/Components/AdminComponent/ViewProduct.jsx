import React from "react";
import { Table, Tag, Space } from "antd";

const productData = [
  {
    user: {
      productId: "123",
      name: "abce",
      detail: "ab",
      price: 23,
      webiste: "abcc.com",
    },
  },
];

const data = [
  {
    key: "1",
    name: "Rolex",
    price: 32,
    address: "New York No. 1 Lake Park",
    tags: ["watch", "clothing"],
  },
  {
    key: "2",
    name: "Addidas",
    price: 3200,
    address: "London No. 1 Lake Park",
    tags: ["shoes", "clothing"],
  },
  {
    key: "3",
    name: "Joe Black",
    price: 32000,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "black"],
  },
  {
    key: "4",
    name: "Rolex",
    price: 32,
    address: "New York No. 1 Lake Park",
    tags: ["watch", "clothing"],
  },
  {
    key: "5",
    name: "Addidas",
    price: 3200,
    address: "London No. 1 Lake Park",
    tags: ["shoes", "clothing"],
  },
  {
    key: "6",
    name: "Joe Black",
    price: 32000,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "black"],
  },
  {
    key: "7",
    name: "Rolex",
    price: 32,
    address: "New York No. 1 Lake Park",
    tags: ["watch", "clothing"],
  },
  {
    key: "8",
    name: "Addidas",
    price: 3200,
    address: "London No. 1 Lake Park",
    tags: ["shoes", "clothing"],
  },
  {
    key: "9",
    name: "Joe Black",
    price: 32000,
    address: "Sidney No. 1 Lake Park",
    tags: ["cool", "black"],
  },
];
export function ViewProduct({ allProductData, setAllProductData }) {
  const columns = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Tags",
      key: "tags",
      dataIndex: "tags",
      render: (tags) => (
        <>
          {tags.map((tag) => {
            let color = tag.length > 5 ? "geekblue" : "green";
            if ((tag === "shoes", "clothing")) {
              color = "volcano";
            }
            return (
              <Tag color={color} key={tag}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        const onDeleteHandler = () => {
          console.log("onDeleteHandler", text, record);
          setAllProductData((prev) =>
            prev.filter((item) => item.name !== text.name)
          );
        };
        return (
          <Space size='middle'>
            <a>View {record.name}</a>
            <div onClick={onDeleteHandler}>
              <a>Delete</a>
            </div>
          </Space>
        );
      },
    },
  ];
  return (
    <div>
      <Table columns={columns} dataSource={allProductData} />
    </div>
  );
}
