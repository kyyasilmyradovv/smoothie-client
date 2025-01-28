import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tag, Tooltip } from "antd";

const RatingTags = (props: { value: string; label: string }) => {
  const { value, label } = props;
  // const appCustomization = useAppSelector(
  //   (state) => state.general.appCustomization
  // );

  const renderingColor = (value: string) => {
    const gettedValue = Number(value[0]);

    if (gettedValue < 5) {
      return "#FB430A";
    } else if (gettedValue > 4 && gettedValue < 8) {
      return "#F09819";
    } else if (gettedValue > 7) {
      return "#00C853";
    } else {
      return "";
    }
  };

  const renderingBGDesc = (value: string) => {
    const gettedValue = Number(value[0]);

    if (gettedValue < 5) {
      return "Low";
    } else if (gettedValue > 4 && gettedValue < 8) {
      return "Medium";
    } else if (gettedValue > 7) {
      return "High";
    } else {
      return "";
    }
  };

  const renderingValue = (value: string) => {
    if (value === "Short") {
      return "sell";
    } else if (value === "Long") {
      return "buy";
    } else {
      return "";
    }
  };

  return (
    <Tooltip
      styles={{
        body: {
          padding: "10px",
        },
      }}
      placement="top"
      title={`${renderingBGDesc(
        value
      )} conviction that the user should ${renderingValue(label)} the token`}
    >
      <Tag
        color={renderingColor(value)}
        style={{
          fontSize: "10px",
        }}
      >
        {label}
        <QuestionCircleOutlined style={{ marginLeft: "3px" }} />
      </Tag>
    </Tooltip>
  );
};

export default RatingTags;
