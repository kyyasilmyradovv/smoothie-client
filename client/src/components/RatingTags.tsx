import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Tag, Typography } from "antd";

const RatingTags = (props: { value: string; label: string }) => {
  const { value, label } = props;
  // const appCustomization = useAppSelector(
  //   (state) => state.general.appCustomization
  // );

  const renderingColor = (value: string) => {
    const gettedValue = Number(value[0]);

    if (gettedValue < 5) {
      return "linear-gradient(180deg, hsla(0, 85%, 60%, 1) 0%, hsla(0, 26%, 8%, 1) 51%, hsla(0, 85%, 60%, 1) 100%)";
    } else if (gettedValue > 4 && gettedValue < 8) {
      return "linear-gradient(180deg, hsla(49, 44%, 55%, 1) 1%, hsla(60, 11%, 19%, 1) 48%, hsla(49, 44%, 55%, 1) 100%)";
    } else if (gettedValue > 7) {
      return "linear-gradient(180deg, hsla(143, 29%, 44%, 1) 0%, hsla(143, 62%, 10%, 1) 51%, hsla(143, 29%, 44%, 1) 100%)";
    } else {
      return "";
    }
  };

  return (
    <Tag
      // color={renderingColor(value)}
      style={{
        fontSize: "10px",
        background: renderingColor(value),
        color: "#FFFFFF",
      }}
    >
      {label === "Long" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}

      <Typography.Text style={{ fontSize: "10px", color: "#FFFFFF" }}>
        {label}
      </Typography.Text>
    </Tag>
  );
};

export default RatingTags;
