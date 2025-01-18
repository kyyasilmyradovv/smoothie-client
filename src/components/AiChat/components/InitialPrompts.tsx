import { Button, Col, Image, Row, Typography } from "antd";
import XNewIcon from "../../../assets/XNew.png";
import IChart from "../../../assets/IChart.png";
import IChart2 from "../../../assets/IChart2.png";

const InitialPrompts = () => {
  return (
    <Row gutter={[10, 10]} style={{ marginTop: "10px", width: "auto" }}>
      {[
        {
          text: "What are people saying on X?",
          icon: (
            <Image width="15px" height="15px" src={XNewIcon} preview={false} />
          ),
        },
        {
          text: "Technical analysis of each token",
          icon: (
            <Image width="15px" height="15px" src={IChart} preview={false} />
          ),
        },
        {
          text: "Create me a Smoothie of all tokens analysed for $500",
          icon: (
            <Image width="15px" height="15px" src={IChart2} preview={false} />
          ),
        },
      ].map((e, index, data) => (
        <Col
          style={
            index % 2 === 0 && index === data.length - 1
              ? {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }
              : {}
          }
          span={index % 2 === 0 && index === data.length - 1 ? 24 : 12}
        >
          <Button
            style={{
              width: "auto",
              float: index % 2 === 0 ? "right" : "left",
            }}
            icon={e.icon}
          >
            <Typography.Text>{e.text}</Typography.Text>
          </Button>
        </Col>
      ))}
    </Row>
  );
};

export default InitialPrompts;
