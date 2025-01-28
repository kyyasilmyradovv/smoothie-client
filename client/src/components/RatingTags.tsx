import { QuestionCircleOutlined } from "@ant-design/icons";
import { Tag } from "antd";

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

  return (
    <Tag
      color={renderingColor(value)}
      style={{
        fontSize: "10px",
      }}
    >
      {label}
    </Tag>
  );
};

export default RatingTags;
