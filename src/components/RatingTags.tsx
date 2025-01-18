import { Tag, Typography } from "antd";
import { useAppSelector } from "../store/hooks";

const RatingTags = (props: { value: string }) => {
  const { value } = props;
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );

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
  return appCustomization.theme === "dark" ? (
    <div>
      <Typography.Text
        ellipsis={{
          tooltip: value,
        }}
        style={{
          color: renderingColor(value),
          fontSize: "10px",
        }}
      >
        {value}
      </Typography.Text>
    </div>
  ) : (
    <Tag color={renderingColor(value)} style={{ fontSize: "10px" }}>
      {value}
    </Tag>
  );
};

export default RatingTags;
