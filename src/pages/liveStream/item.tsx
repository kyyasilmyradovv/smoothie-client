/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Col,
  Image,
  Input,
  Row,
  Table,
  Tag,
  Tooltip,
  Typography,
} from "antd";
import styles from "./index.module.scss";
import ReactPlayer from "react-player";
import ITradeVideo from "../../assets/stream-1.mp4";
import ISmile from "../../assets/ISmile.png";
import CAvatar2 from "../../assets/CAvatar.png";
import CAvatar1 from "../../assets/CAvatar1.png";
import IStreamer from "../../assets/Streamer.png";
import IMenu from "../../assets/Menu-3.png";
import IDoc from "../../assets/Document-1-Copy.png";
import IPlus from "../../assets/Pluse ellipse.svg";
import logo from "../../assets/Smoothie logo 1.png";
import logo1 from "../../assets/logo.png";
import XNewIcon from "../../assets/XNew.png";
import IChart from "../../assets/IChart.png";
import IChart2 from "../../assets/IChart2.png";
import IWeb from "../../assets/website logo.png";
import IDex from "../../assets/dexscreener logo 8.png";
import ITwitTab from "../../assets/ITwitTab.png";
import {
  ArrowUpOutlined,
  DislikeOutlined,
  DownOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";

const LiveStream = () => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
        }}
      >
        <Typography.Text
          style={{
            fontSize: "16px",
            fontWeight: "500",
            lineHeight: "30px",
            color: "#FFF",
          }}
        >
          Live Stream
        </Typography.Text>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <div
            className={styles["videoWrapper"]}
            style={{ position: "relative" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#F60000",
                borderRadius: "4px",
                padding: "0 8px",
                height: "20px",
                position: "absolute",
                top: "5px",
                left: "5px",
                zIndex: "1000000",
              }}
            >
              <div
                style={{
                  background: "#FFFFFF",
                  height: "5px",
                  width: "5px",
                  borderRadius: "50%",
                  marginRight: "5px",
                }}
              ></div>
              <Typography.Text
                style={{
                  fontSize: "10px",
                  fontWeight: "500",
                  lineHeight: "18px",
                  color: "#FFF",
                }}
              >
                Live
              </Typography.Text>
            </div>
            <ReactPlayer
              width="100%"
              height="375px"
              className={styles["videoWrapper"]}
              url={ITradeVideo}
              playing
              loop
              controls
              muted
              style={{ objectFit: "cover" }}
            />

            <div className={styles["videoController"]}>
              <div className={styles.blur}></div>
            </div>
          </div>
        </Col>
        <Col span={8}>
          <div
            style={{
              height: "100%",
              width: "100%",
              background: "rgba(53, 56, 64, 0.52)",
              borderRadius: "16px",
              padding: "12px 16px",
              position: "relative",
              // display: "flex",
              // flexDirection: "column",
              // justifyContent: "space-between",
            }}
          >
            <Typography.Text
              style={{
                fontSize: "16px",
                fontWeight: "500",
                lineHeight: "30px",
                color: "#FFF",
              }}
            >
              Stream chat
            </Typography.Text>
            {[
              {
                avatar: CAvatar1,
                title: "Han Solo",
                decription:
                  "Amazing insights on today’s market trends! 🚀 What’s your take on Bitcoin’s potential resistance at $30k?",
              },
              {
                avatar: CAvatar2,
                title: "Dimitri",
                decription: "We supply a series of design pr...",
              },
            ]?.map((e: any) => (
              <div style={{ marginTop: "16px", display: "flex", gap: "16px" }}>
                <Avatar
                  src={e.avatar}
                  size={35}
                  shape="circle"
                  // icon={<UserOutlined />}
                />
                <div>
                  <Typography.Text
                    style={{
                      fontSize: "12px",
                      lineHeight: "20px",
                      color: "#FFF",
                    }}
                  >
                    {e.title}
                  </Typography.Text>
                  <div style={{ marginTop: "4px", width: "250px" }}>
                    <Typography.Text
                      style={{
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#FFF",
                      }}
                    >
                      {e.decription}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: "14px",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <LikeOutlined />
                      <Typography.Text>0</Typography.Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <DislikeOutlined />
                      <Typography.Text>0</Typography.Text>
                    </div>
                    <Typography.Text type="secondary">Reply to</Typography.Text>
                  </div>
                </div>
              </div>
            ))}
            <Input
              style={{
                borderRadius: "16px",
                height: "32px",
                border: "1px solid var(--background, #B1B1B1)",
                position: "absolute",
                bottom: "10px",
                width: "90%",
                left: "16px",
              }}
              placeholder="Send a message"
              suffix={
                <Image
                  width="20px"
                  height="20px"
                  src={ISmile}
                  preview={false}
                />
              }
            />
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "12px" }}>
        <Col span={24}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Avatar
                src={IStreamer}
                size={70}
                shape="circle"
                icon={<UserOutlined />}
              />
              <div>
                <Typography.Title level={3}>
                  New Virtuals Agents
                </Typography.Title>
                <Typography.Text
                  style={{
                    color: "#FFF;",
                    fontSize: "14px",
                  }}
                  underline
                >
                  Recrent
                </Typography.Text>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "30px" }}
                >
                  <Typography.Text
                    type="secondary"
                    style={{
                      fontSize: "14px",
                    }}
                  >
                    34K followers
                  </Typography.Text>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    {["btc", "onlinetv", "atcoin", "trading"]?.map((e) => (
                      <Tag
                        style={{
                          background: "var(--black-2, #3F3F3F)",
                          borderRadius: "4px",
                        }}
                      >
                        #{e}
                      </Tag>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Button
                  icon={<HeartOutlined />}
                  style={{
                    borderRadius: "16px",
                    border: "1px solid var(--red-danger, #E91916)",
                    background: "linear-gradient(96deg, #F00 0%, #FB430A 100%)",
                  }}
                >
                  Follow
                </Button>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <EyeOutlined style={{ fontSize: "14px", color: "white" }} />
                <Typography.Text>2343</Typography.Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <HeartFilled style={{ color: "red", fontSize: "14px" }} />
                <Typography.Text>242</Typography.Text>
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                }}
              >
                <Image src={IMenu} preview={false} style={{ height: "15px" }} />
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              paddingBottom: "15px",
              background: "rgba(53, 56, 64, 0.52)",
              borderRadius: "16px",
            }}
          >
            <Table
              scroll={{ y: "auto" }}
              tableLayout="fixed"
              pagination={false}
              dataSource={[
                {
                  Ticker: "$GOAT",
                  CA: "0x1C4CcA7C5DB003824208aDDA61Bd749e55F463a3",
                  Rating: "9/10",
                  EntryPrice: "0.23",
                  Color: "#56C600",
                },
                {
                  Ticker: "$KINGLANAND",
                  CA: "KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvEP",
                  Rating: "7/10",
                  EntryPrice: "1.53",
                  Color: "#56C600",
                },
                {
                  Ticker: "$GRIFFAIN",
                  CA: "KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvEP",
                  Rating: "2/10",
                  EntryPrice: "0.81",
                  Color: "#E91916",
                },
                {
                  Ticker: "$FARTCOIN",
                  CA: "KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvEP",
                  Rating: "8/10",
                  EntryPrice: "1.22",
                  Color: "#00C853",
                },
              ]}
              columns={[
                {
                  title: (
                    <Tooltip placement="topLeft" title={"Token symbol"}>
                      <Typography.Text
                        style={{
                          fontSize: "10px",
                          fontWeight: "400",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          justifyContent: "center",
                        }}
                        ellipsis={{
                          tooltip: "Ticker(?)",
                        }}
                      >
                        Ticker
                        <ExclamationCircleOutlined />
                      </Typography.Text>
                    </Tooltip>
                  ),
                  dataIndex: "Ticker",
                  key: "Ticker",
                  width: 220,
                  onHeaderCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  onCell: () => ({
                    style: { textAlign: "left" },
                  }),
                  render: (_: any, record: any) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography.Text
                          ellipsis={{
                            tooltip: record.Ticker,
                          }}
                        >
                          {record.Ticker}
                        </Typography.Text>
                      </div>
                    );
                  },
                },
                {
                  title: (
                    <Typography.Text
                      style={{
                        fontSize: "10px",
                        fontWeight: "400",
                      }}
                      ellipsis={{
                        tooltip: "Links",
                      }}
                    >
                      Links
                    </Typography.Text>
                  ),
                  dataIndex: "Links",
                  key: "Links",
                  width: 80,
                  onHeaderCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  onCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  render: (_: any, record: any) => {
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          // justifyContent: "center",
                          // gap: "6px",
                          // width: "50%",
                        }}
                      >
                        <Button
                          type="link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={() => {
                            const url = `https://x.com/search?q=${record.Ticker}`;
                            window.open(url, "_blank");
                          }}
                          icon={
                            <Image
                              src={ITwitTab}
                              preview={false}
                              style={{ width: "10px", height: "10px" }}
                            />
                          }
                        >
                          {/* */}
                        </Button>
                        <Button
                          type="link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                          icon={
                            <Image
                              src={IWeb}
                              preview={false}
                              style={{ width: "15px", height: "15px" }}
                            />
                          }
                        >
                          {/* */}
                        </Button>
                        <Button
                          type="link"
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                          icon={
                            <Image
                              src={IDex}
                              preview={false}
                              style={{ width: "15px", height: "15px" }}
                            />
                          }
                        >
                          {/* */}
                        </Button>
                      </div>
                    );
                  },
                },
                {
                  title: (
                    <Tooltip
                      placement="topLeft"
                      title={
                        "Each token has unique contract address for identification"
                      }
                    >
                      <Typography.Text
                        style={{
                          fontSize: "10px",
                          fontWeight: "400",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          justifyContent: "center",
                        }}
                        ellipsis={{
                          tooltip: "CA(?)",
                        }}
                      >
                        CA
                        <ExclamationCircleOutlined />
                      </Typography.Text>
                    </Tooltip>
                  ),
                  // width: 350,
                  dataIndex: "CA",
                  key: "CA",
                  onHeaderCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  onCell: () => ({
                    style: { textAlign: "left" },
                  }),
                  render: (_: any, record: any) => {
                    return (
                      <div
                        style={{
                          background: "#323232",
                          borderRadius: "16px",
                          padding: "2px 5px",
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <Image
                          src={IDoc}
                          preview={false}
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        />
                        <Typography.Text
                          ellipsis={{
                            tooltip: record.CA,
                          }}
                          style={{ fontSize: "10px" }}
                        >
                          {record.CA}
                        </Typography.Text>
                      </div>
                    );
                  },
                },

                {
                  title: (
                    <Tooltip
                      placement="topLeft"
                      title={
                        "Price of the token at the time of the analysis Rating assigned to the token by the streamer based on performed analysis."
                      }
                    >
                      <Typography.Text
                        style={{
                          fontSize: "10px",
                          fontWeight: "400",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          justifyContent: "center",
                        }}
                        ellipsis={{
                          tooltip: "Entry Price(?)",
                        }}
                      >
                        Entry Price
                        <ExclamationCircleOutlined />
                      </Typography.Text>
                    </Tooltip>
                  ),
                  width: 150,
                  dataIndex: "EntryPrice",
                  key: "EntryPrice",
                  onHeaderCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  onCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  render: (_: any, record: any) => {
                    return (
                      <Typography.Text
                        ellipsis={{
                          tooltip: record.EntryPrice,
                        }}
                      >
                        ${record.EntryPrice}
                      </Typography.Text>
                    );
                  },
                },
                {
                  title: (
                    <Tooltip
                      placement="topLeft"
                      title={
                        "Positive rating does not constitute as a financial advice and you MUST do your own due diligence for any investment decisions."
                      }
                    >
                      <Typography.Text
                        style={{
                          fontSize: "10px",
                          fontWeight: "400",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          justifyContent: "center",
                        }}
                        ellipsis={{
                          tooltip: "Rating(?)",
                        }}
                      >
                        Rating
                        <ExclamationCircleOutlined />
                      </Typography.Text>
                    </Tooltip>
                  ),
                  width: 220,
                  dataIndex: "Rating",
                  key: "Rating",
                  onHeaderCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  onCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  render: (_: any, record: any) => {
                    return (
                      <Typography.Text
                        ellipsis={{
                          tooltip: record.Rating,
                        }}
                        type="success"
                        style={{
                          fontSize: "10px",
                          color: record?.Color,
                        }}
                      >
                        {record.Rating}
                      </Typography.Text>
                    );
                  },
                },
                {
                  title: (
                    // <Tooltip
                    //   placement="topLeft"
                    //   title={"Decription Actions"}
                    // >
                    <Typography.Text
                      style={{ fontSize: "10px", fontWeight: "400" }}
                      ellipsis={{
                        tooltip: "Create Smoothie",
                      }}
                    >
                      Create Smoothie
                    </Typography.Text>
                    // </Tooltip>
                  ),
                  width: "50",
                  dataIndex: "CreateSmoothie",
                  key: "CreateSmoothie",
                  fixed: "right",
                  onHeaderCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  onCell: () => ({
                    style: { textAlign: "center" },
                  }),
                  render: (_: any) => {
                    return (
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <div
                          style={{
                            borderRadius: "16px",
                            border: "2px solid #AE1FCE",
                            padding: "2px 5px",
                            width: "90px",
                            cursor: "pointer",
                          }}
                        >
                          <Image
                            src={IPlus}
                            preview={false}
                            style={{
                              width: "15px",
                              height: "15px",
                              marginRight: "5px",
                            }}
                          />
                          <Typography.Text style={{ fontSize: "10px" }}>
                            Add to
                          </Typography.Text>
                          <Image
                            src={logo}
                            preview={false}
                            style={{
                              width: "15px",
                              height: "15px",
                              marginLeft: "5px",
                            }}
                          />
                        </div>
                      </div>
                    );
                  },
                },
              ]}
            />
            <div style={{ marginTop: "10px" }}>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                }}
              >
                <Typography.Text style={{ fontSize: "12px", color: "#1F6FCE" }}>
                  See more
                </Typography.Text>
                <DownOutlined style={{ color: "#1F6FCE" }} />
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: "22px" }}>
        <Col span={24}>
          <div
            style={{
              background: "rgba(53, 56, 64, 0.52)",
              borderRadius: "16px",
              padding: "19px 68px",
              display: "flex",
              // justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Image
                src={logo1}
                preview={false}
                style={{
                  width: "50px",
                  height: "50px",
                }}
              />
              <Typography.Title level={3}>
                Create Your Smoothie
              </Typography.Title>

              <Tooltip
                placement="topRight"
                title={"Chat with Smoothie AI to execute your transactions"}
              >
                <Button type="text">
                  <Typography.Title
                    style={{ fontWeight: "400", fontSize: "14px" }}
                    italic
                    level={4}
                  >
                    Insert a prompt
                  </Typography.Title>
                  <ExclamationCircleOutlined
                    style={{ fontSize: "12px", marginLeft: "3px" }}
                  />
                </Button>
              </Tooltip>
            </div>
            <div style={{ marginTop: "63px", display: "flex", gap: "8px" }}>
              <Button
                icon={
                  <Image
                    width="15px"
                    height="15px"
                    src={XNewIcon}
                    preview={false}
                  />
                }
              >
                What are people saying on X?
              </Button>

              <Button
                icon={
                  <Image
                    width="15px"
                    height="15px"
                    src={IChart}
                    preview={false}
                  />
                }
              >
                Technical analysis of each token
              </Button>
            </div>
            <div style={{ marginTop: "13px" }}>
              <Button
                icon={
                  <Image
                    width="15px"
                    height="15px"
                    src={IChart2}
                    preview={false}
                  />
                }
              >
                Create me a Smoothie of all tokens analysed for $500
              </Button>
            </div>
            <Input
              style={{
                borderRadius: "8px",
                height: "40px",
                border: "0.5px solid var(--background, #B1B1B1)",
                width: "672px",
                background: "var(--black-2, #3F3F3F)",
                marginTop: "63px",
              }}
              placeholder="Type a message . . ."
              suffix={
                <Button
                  style={{ borderRadius: "6px", background: "#635B5B" }}
                  icon={<ArrowUpOutlined />}
                />
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LiveStream;
