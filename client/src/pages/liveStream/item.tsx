/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Button,
  Col,
  Grid,
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
// import ISmile from "../../assets/ISmile.png";
import CAvatar2 from "../../assets/CAvatar.png";
import CAvatar1 from "../../assets/CAvatar1.png";
import IStreamer from "../../assets/Streamer.png";
// import IMenu from "../../assets/Menu-3.png";
// import IDoc from "../../assets/Document-1-Copy.png";
import IPlus from "../../assets/Pluse ellipse.svg";
import logo from "../../assets/Smoothie logo 1.png";
import IWeb from "../../assets/website logo.png";
import WIWeb from "../../assets/Wwebsite logo.png";
import IDex from "../../assets/dexscreener logo 8.png";
import ITwitTab from "../../assets/ITwitTab.png";
import WITwitTab from "../../assets/Wtwitter-x 1.png";
import {
  ArrowUpOutlined,
  CopyOutlined,
  DislikeOutlined,
  DownOutlined,
  QuestionCircleOutlined,
  EyeOutlined,
  HeartFilled,
  HeartOutlined,
  LikeOutlined,
  MoreOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setAddSmothieName,
  setChats,
  setIsAddSmothieModalOpen,
  setLastEditedSmothieName,
  setSettedSmothies,
} from "../../store/general/generalSlice";
import { formatPrice, getUSDValue } from "../../functions";
import RatingTags from "../../components/RatingTags";
import AiChat from "../../components/AiChat/AiChat";
import { useEffect } from "react";
const { useBreakpoint } = Grid;
const LiveStream = () => {
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const settedSmothies = useAppSelector(
    (state) => state.general.settedSmothies
  );

  useEffect(() => {
    dispatch(setChats([]));
    dispatch(setSettedSmothies({}));
    dispatch(setLastEditedSmothieName(""));
  }, []);

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
            // color: "#FFF",
          }}
        >
          Live Stream
        </Typography.Text>
      </div>
      <Row gutter={[16, 16]}>
        <Col lg={16} xs={24}>
          <div
            className={styles["videoWrapper"]}
            style={{
              position: "relative",
              cursor: "pointer",
              height: screens.lg ? "422px" : "auto",
              borderRadius: "16px",
            }}
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
                zIndex: "1000",
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
              height={screens.lg ? "422px" : "auto"}
              className={styles["videoWrapper"]}
              url={ITradeVideo}
              playing
              loop
              controls
              muted
              style={{ aspectRatio: "16 / 9" }}
            />

            <div className={styles["videoController"]}>
              <div className={styles.blur}></div>
            </div>
          </div>
        </Col>

        {!screens.lg && (
          <Col span={24}>
            <Typography.Title level={3}>Solana AI plays</Typography.Title>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                width: "100%",
              }}
            >
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <Avatar
                  src={IStreamer}
                  size={70}
                  shape="circle"
                  icon={<UserOutlined />}
                />
                <div>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "30px",
                    }}
                  >
                    <Typography.Text
                      type="secondary"
                      style={{
                        fontSize: "14px",
                      }}
                    >
                      34K followers
                    </Typography.Text>
                  </div>
                </div>
              </div>

              <Button
                icon={<HeartOutlined />}
                style={{
                  borderRadius: "16px",
                  border: "1px solid var(--red-danger, #E91916)",
                  background: "linear-gradient(96deg, #F00 0%, #FB430A 100%)",
                  color: "#FFFFFF",
                }}
              >
                Follow
              </Button>
            </div>

            <Col
              span={24}
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2px",
                  marginTop: "15px",
                  width: "190px",
                  overflow: "auto",
                }}
              >
                {["Solana", "AI", "griffain"]?.map((e) => (
                  <Tag
                    style={{
                      background:
                        appCustomization.theme === "dark"
                          ? "var(--black-2, #3F3F3F)"
                          : "#E5E7EB",
                      borderRadius: "4px",
                    }}
                  >
                    #{e}
                  </Tag>
                ))}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "5px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "5px",
                  }}
                >
                  <EyeOutlined style={{ fontSize: "14px" }} />
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
                    // gap: "5px",
                  }}
                >
                  {/* <Image src={IMenu} preview={false} style={{ height: "15px" }} /> */}
                  <MoreOutlined style={{ fontSize: "16px" }} />
                </div>
              </div>
            </Col>
          </Col>
        )}

        <Col lg={8} xs={24}>
          <div
            style={{
              height: screens.lg ? "100%" : "320px",
              width: "100%",
              background:
                appCustomization.theme === "dark"
                  ? "rgba(53, 56, 64, 0.52)"
                  : "#F1F1F1",
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
                fontSize: screens.lg ? "16px" : "14px",
                fontWeight: "500",
                lineHeight: "30px",
                // color: "#FFF",
              }}
            >
              Stream chat
            </Typography.Text>
            {[
              {
                avatar: CAvatar1,
                title: "Han Solo",
                decription:
                  "$GRIFFAIN actually looks like a great buy considering Solana support and mobile integration.",
              },
              {
                avatar: CAvatar2,
                title: "Dimitri",
                decription:
                  "Yeah, but imo many better opportunities out there with lower mcaps..",
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
                      // color: "#FFF",
                    }}
                  >
                    {e.title}
                  </Typography.Text>
                  <div style={{ marginTop: "4px", width: "250px" }}>
                    <Typography.Text
                      style={{
                        fontSize: screens.lg ? "14px" : "12px",
                        lineHeight: "20px",
                        // color: "#FFF",
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
              prefix={
                <SmileOutlined
                  style={{ fontSize: "16px", marginRight: "5px" }}
                />
              }
              suffix={
                <Button
                  style={{ background: "#00C853" }}
                  size="small"
                  shape="circle"
                  icon={<ArrowUpOutlined style={{ color: "#FFFFFF" }} />}
                />
              }
            />
          </div>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginTop: "12px" }}>
        <Col span={24}>
          {screens.lg && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <Avatar
                  src={IStreamer}
                  size={70}
                  shape="circle"
                  icon={<UserOutlined />}
                />
                <div>
                  <Typography.Title level={3}>Solana AI plays</Typography.Title>
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
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "30px",
                    }}
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
                      {["Solana", "AI", "griffain"]?.map((e) => (
                        <Tag
                          style={{
                            background:
                              appCustomization.theme === "dark"
                                ? "var(--black-2, #3F3F3F)"
                                : "#E5E7EB",
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
                      background:
                        "linear-gradient(96deg, #F00 0%, #FB430A 100%)",
                      color: "#FFFFFF",
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
                  <EyeOutlined style={{ fontSize: "14px" }} />
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
                  {/* <Image src={IMenu} preview={false} style={{ height: "15px" }} /> */}
                  <MoreOutlined style={{ fontSize: "16px" }} />
                </div>
              </div>
            </div>
          )}
          <div
            style={{
              marginTop: "20px",
              paddingBottom: "15px",
              background:
                appCustomization.theme === "dark"
                  ? "rgba(53, 56, 64, 0.52)"
                  : "#F1F1F1",
              borderRadius: "16px",
            }}
          >
            <Table
              // bordered
              scroll={{ y: "auto" }}
              tableLayout="fixed"
              pagination={false}
              dataSource={[
                {
                  Ticker: "$GOAT",
                  CA: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
                  Rating: "5/10",
                  Rate: "Short",
                  EntryPrice: "0.23",
                  FDV: "349m",
                  TargetFDV: "519m",
                  Web: "https://goat.cx/",
                  Dex: " https://dexscreener.com/solana/9tb2ohu5p16bpbarqd3n27wnkf51ukfs8z1gzzldxvzw",
                },

                {
                  Ticker: "$GRIFFAIN",
                  CA: "KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvEP",
                  Rating: "8/10",
                  Rate: "Long",
                  EntryPrice: "0.81",
                  FDV: "434m",
                  TargetFDV: "420m",
                  Web: "https://griffain.com/ ",
                  Dex: "https://dexscreener.com/solana/cpsmssqi3p9vmvnqxrdwvbsbcwyuhbggncrw7morbq3g",
                },
                {
                  Ticker: "$GNON",
                  CA: "HeJUFDxfJSzYFUuHLxkMqCgytU31G6mjP4wKviwqpump",
                  Rating: "4/10",
                  Rate: "Long",
                  EntryPrice: "1.53",
                  FDV: "42m",
                  TargetFDV: "69m",
                  Web: "https://echochambers.ai/",
                  Dex: "https://dexscreener.com/solana/2ur2gzkshap8xj33qss7c5zutd9mrjvrgwohr2q7t1sv",
                },
                {
                  Ticker: "$FARTCOIN",
                  CA: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
                  Rating: "9/10",
                  Rate: "Long",
                  EntryPrice: "1.22",
                  FDV: "1bn",
                  TargetFDV: "1.1bn",
                  Web: "https://www.infinitebackrooms.com/dreams/conversation-1721540624-scenario-terminal-of-truths-txt",
                  Dex: "https://dexscreener.com/solana/bzc9nzfmqkxr6fz1dbph7bdf9broyef6pnzesp7v5iiw",
                },
              ]}
              columns={
                screens.lg
                  ? [
                      {
                        title: (
                          <Tooltip
                            styles={{
                              body: {
                                padding: "10px",
                              },
                            }}
                            placement="top"
                            title={"Token symbol"}
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
                                tooltip: "Ticker(?)",
                              }}
                            >
                              Ticker
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        dataIndex: "Ticker",
                        key: "Ticker",
                        width: 100,
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
                                    src={
                                      appCustomization.theme === "dark"
                                        ? ITwitTab
                                        : WITwitTab
                                    }
                                    preview={false}
                                    style={{ width: "12px", height: "12px" }}
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
                                onClick={() => {
                                  const url = record.Web;
                                  window.open(url, "_blank");
                                }}
                                icon={
                                  <Image
                                    src={
                                      appCustomization.theme === "dark"
                                        ? IWeb
                                        : WIWeb
                                    }
                                    preview={false}
                                    style={{ width: "18px", height: "18px" }}
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
                                onClick={() => {
                                  const url = record.Dex;
                                  window.open(url, "_blank");
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
                            styles={{
                              body: {
                                padding: "10px",
                              },
                            }}
                            placement="top"
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
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        width: 350,
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
                                background:
                                  appCustomization.theme === "dark"
                                    ? "#323232"
                                    : "#E5E7EB",
                                borderRadius: "16px",
                                padding: "2px 5px",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              {/* <Image
                          src={IDoc}
                          preview={false}
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        /> */}
                              <CopyOutlined />
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
                            styles={{
                              body: {
                                padding: "10px",
                              },
                            }}
                            placement="top"
                            title={
                              "Rating does not constitute as a financial advice and you MUST do your own due diligence for any investment decisions."
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
                              <QuestionCircleOutlined />
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
                            <RatingTags
                              value={record.Rating}
                              label={record.Rate}
                            />
                          );
                        },
                      },
                      {
                        title: (
                          <Tooltip
                            styles={{
                              body: {
                                padding: "10px",
                              },
                            }}
                            placement="top"
                            title={
                              "Fully diluted valuation during the analysis."
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
                                tooltip: "FDV(?)",
                              }}
                            >
                              FDV
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        width: 220,
                        dataIndex: "FDV",
                        key: "FDV",
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
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              ${record.FDV}
                            </Typography.Text>
                          );
                        },
                      },
                      {
                        title: (
                          <Tooltip
                            styles={{
                              body: {
                                padding: "10px",
                              },
                            }}
                            placement="top"
                            title={
                              "Fully diluted valuation for potential exit from the position."
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
                                tooltip: "FDV(?)",
                              }}
                            >
                              Target FDV
                              <QuestionCircleOutlined />
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
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              ${record.TargetFDV}
                            </Typography.Text>
                          );
                        },
                      },
                      {
                        title: (
                          // <Tooltip
                          //   placement="top"
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
                        width: 120,
                        dataIndex: "CreateSmoothie",
                        key: "CreateSmoothie",
                        // fixed: "right",
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
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{
                                  borderRadius: "16px",
                                  border: "2px solid #AE1FCE",
                                  padding: "2px 5px",
                                  width: "100%",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  maxWidth: "150px",
                                }}
                                onClick={() => {
                                  dispatch(setIsAddSmothieModalOpen(true));
                                  dispatch(setAddSmothieName(record?.Ticker));
                                }}
                              >
                                {!settedSmothies[record?.Ticker]?.value ? (
                                  <Image
                                    src={IPlus}
                                    preview={false}
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      marginRight: "5px",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      marginRight: "5px",
                                    }}
                                  ></div>
                                )}
                                {settedSmothies[record?.Ticker]?.value ? (
                                  <Typography.Text
                                    ellipsis={{
                                      tooltip: `${
                                        settedSmothies[record?.Ticker]?.type
                                      }  ${
                                        settedSmothies[record?.Ticker]?.value
                                      }`,
                                    }}
                                    style={{
                                      fontSize: "10px",
                                      width: "80px",
                                      // textAlign: "center",
                                    }}
                                  >
                                    {settedSmothies[record?.Ticker]?.type}{" "}
                                    {formatPrice(
                                      settedSmothies[record?.Ticker]?.value
                                    )}
                                  </Typography.Text>
                                ) : (
                                  <Typography.Text style={{ fontSize: "10px" }}>
                                    Add to
                                  </Typography.Text>
                                )}
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
                    ]
                  : [
                      {
                        title: (
                          <Tooltip placement="top" title={"Token symbol"}>
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
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        dataIndex: "Ticker",
                        key: "Ticker",
                        width: 80,
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
                                    src={
                                      appCustomization.theme === "dark"
                                        ? ITwitTab
                                        : WITwitTab
                                    }
                                    preview={false}
                                    style={{ width: "12px", height: "12px" }}
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
                                onClick={() => {
                                  const url = record.Web;
                                  window.open(url, "_blank");
                                }}
                                icon={
                                  <Image
                                    src={
                                      appCustomization.theme === "dark"
                                        ? IWeb
                                        : WIWeb
                                    }
                                    preview={false}
                                    style={{ width: "18px", height: "18px" }}
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
                                onClick={() => {
                                  const url = record.Dex;
                                  window.open(url, "_blank");
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
                            placement="top"
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
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        width: 80,
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
                            <RatingTags
                              value={record.Rating}
                              label={record.Rate}
                            />
                          );
                        },
                      },
                      {
                        title: (
                          // <Tooltip
                          //   placement="top"
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
                        width: 120,
                        dataIndex: "CreateSmoothie",
                        key: "CreateSmoothie",
                        // fixed: "right",
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
                                justifyContent: "center",
                              }}
                            >
                              <div
                                style={{
                                  borderRadius: "16px",
                                  border: "2px solid #AE1FCE",
                                  padding: "2px 5px",
                                  width: "100%",
                                  cursor: "pointer",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "space-between",
                                  maxWidth: "150px",
                                }}
                                onClick={() => {
                                  dispatch(setIsAddSmothieModalOpen(true));
                                  dispatch(setAddSmothieName(record?.Ticker));
                                }}
                              >
                                {!settedSmothies[record?.Ticker]?.value ? (
                                  <Image
                                    src={IPlus}
                                    preview={false}
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      marginRight: "5px",
                                    }}
                                  />
                                ) : (
                                  <div
                                    style={{
                                      width: "15px",
                                      height: "15px",
                                      marginRight: "5px",
                                    }}
                                  ></div>
                                )}
                                {settedSmothies[record?.Ticker]?.value ? (
                                  <Typography.Text
                                    ellipsis={{
                                      tooltip: `${
                                        settedSmothies[record?.Ticker]?.type
                                      }  ${
                                        settedSmothies[record?.Ticker]?.value
                                      }`,
                                    }}
                                    style={{
                                      fontSize: "10px",
                                      width: "80px",
                                      // textAlign: "center",
                                    }}
                                  >
                                    {settedSmothies[record?.Ticker]?.type}{" "}
                                    {formatPrice(
                                      settedSmothies[record?.Ticker]?.value
                                    )}
                                  </Typography.Text>
                                ) : (
                                  <Typography.Text style={{ fontSize: "10px" }}>
                                    Add to
                                  </Typography.Text>
                                )}
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
                      {
                        title: (
                          <Tooltip
                            placement="top"
                            title={
                              "Fully diluted valuation during the analysis."
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
                                tooltip: "FDV(?)",
                              }}
                            >
                              FDV
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        width: 100,
                        dataIndex: "FDV",
                        key: "FDV",
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
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              ${record.FDV}
                            </Typography.Text>
                          );
                        },
                      },
                      {
                        title: (
                          <Tooltip
                            placement="top"
                            title={
                              "Fully diluted valuation for potential exit from the position."
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
                                tooltip: "FDV(?)",
                              }}
                            >
                              Target FDV
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        width: 100,
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
                              style={{
                                fontSize: "10px",
                              }}
                            >
                              ${record.TargetFDV}
                            </Typography.Text>
                          );
                        },
                      },
                      {
                        title: (
                          <Tooltip
                            placement="top"
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
                              <QuestionCircleOutlined />
                            </Typography.Text>
                          </Tooltip>
                        ),
                        width: 350,
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
                                background:
                                  appCustomization.theme === "dark"
                                    ? "#323232"
                                    : "#E5E7EB",
                                borderRadius: "16px",
                                padding: "2px 5px",
                                display: "flex",
                                alignItems: "center",
                                gap: "5px",
                              }}
                            >
                              {/* <Image
                          src={IDoc}
                          preview={false}
                          style={{
                            width: "15px",
                            height: "15px",
                          }}
                        /> */}
                              <CopyOutlined />
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
                    ]
              }
              footer={() => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {Object.values(settedSmothies ?? {})
                    .map((e) => e.value ?? 0)
                    .reduce(
                      (accumulator, currentValue) => accumulator + currentValue,
                      0
                    ) ? (
                    <Tooltip
                      placement="top"
                      title={
                        "The shown total is not a correct calculation based on market rates"
                      }
                    >
                      <Typography.Text
                        style={{
                          marginRight: "20px",
                          display: "flex",
                          alignItems: "center",
                          gap: "3px",
                          justifyContent: "center",
                        }}
                      >
                        Total: {"  "}$
                        {Object.values(settedSmothies ?? {})
                          .map(
                            (e) => (e.value ?? 0) * (getUSDValue(e.type) ?? 1)
                          )
                          .reduce(
                            (accumulator, currentValue) =>
                              accumulator + currentValue,
                            0
                          )}
                        <QuestionCircleOutlined />
                      </Typography.Text>
                    </Tooltip>
                  ) : (
                    ""
                  )}
                </div>
              )}
            />
            <div>
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
        <AiChat />
      </Row>
    </div>
  );
};

export default LiveStream;
