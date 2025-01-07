import { Avatar, Image, Input, Typography } from "antd";
import ISearch from "../../assets/Magnifier.png";
import IAvatar from "../../assets/a cute minimalistic simple hedgehog side profile C (1).png";
import IBell from "../../assets/Bell.png";
import IWorld from "../../assets/World.png";
import ISon from "../../assets/Son.png";
import IQues from "../../assets/QuestionCircleFilled.png";
import { DownOutlined } from "@ant-design/icons";

const Navbar = () => {
  return (
    <div
      style={{
        background: "rgb(19 19 19)",
        borderRadius: "16px",
        height: "60px",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "24px 16px",
      }}
    >
      <Input
        size="small"
        placeholder="Search here..."
        prefix={
          <Image
            src={ISearch}
            preview={false}
            style={{ width: "20px", height: "20px", marginRight: "16px" }}
          />
        }
        style={{
          borderRadius: "45px",
          width: "400px",
          padding: "7px 25px",
          border: "0.5px solid #B1B1B1",
          background: "inherit",
        }}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            background: "#F00",
            borderRadius: "16px",
            padding: "7px 14px",
            marginRight: "12px",
          }}
        >
          <Typography.Text style={{ fontWeight: "500", lineHeight: "18px" }}>
            How it works
          </Typography.Text>
          <Image
            src={IQues}
            preview={false}
            style={{ width: "15px", height: "15px", marginLeft: "5px" }}
          />
        </div>

        <div
          style={{
            borderRadius: "16px",
            background: "#323232",
            padding: "5px",
            display: "flex",
            marginRight: "12px",
          }}
        >
          <Image
            src={ISon}
            preview={false}
            style={{ width: "20px", height: "20px", marginRight: "5px" }}
          />
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "black",
            }}
          ></div>
        </div>
        <Image
          src={IWorld}
          preview={false}
          style={{ width: "20px", height: "20px", marginRight: "12px" }}
        />
        <Image
          src={IBell}
          preview={false}
          style={{ width: "20px", height: "20px", marginRight: "12px" }}
        />
        <div
          style={{
            borderRadius: "45px",
            background: "#323232",
            padding: "5px 10px 5px 5px",
          }}
        >
          <Avatar size={35} shape="circle" src={IAvatar} />
          <DownOutlined style={{ color: "#FFFFFF", marginLeft: "15px" }} />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
