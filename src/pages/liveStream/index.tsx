/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Image,
  Row,
  Table,
  Tooltip,
  Typography,
} from "antd";
import styles from "./index.module.scss";
import ReactPlayer from "react-player";
import {
  ArrowRightOutlined,
  CopyOutlined,
  ExclamationCircleOutlined,
  EyeOutlined,
  HeartFilled,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";
import ITradeVideo from "../../assets/stream-1.mp4";
// import IPouse from "../assets/pause.png";
// import IDoc from "../../assets/Document-1-Copy.png";
import IPlus from "../../assets/Pluse ellipse.svg";
import logo from "../../assets/Smoothie logo 1.png";
import IStream1 from "../../assets/asd.png";
import avatar1 from "../../assets/avatar1.png";
import IStream2 from "../../assets/asd2.png";
import avatar2 from "../../assets/avatar2.png";
import IStream3 from "../../assets/asd3.png";
import avatar3 from "../../assets/avatar3.png";
import IStream4 from "../../assets/asd4.png";
import avatar4 from "../../assets/avatar4.png";
import IStream5 from "../../assets/asd5.png";
import avatar5 from "../../assets/avatar5.png";
import Favatar1 from "../../assets/favatar1.png";
import Favatar2 from "../../assets/favatar2.png";
import Favatar3 from "../../assets/favatar3.png";
import Favatar4 from "../../assets/favatar4.png";
import IStreamer from "../../assets/Streamer.png";
import XIcon from "../../assets/X 1.png";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  setAddSmothieName,
  setIsAddSmothieModalOpen,
} from "../../store/general/generalSlice";
import { formatPrice } from "../../functions";
// import { useAppSelector } from "../../store/hooks";
// import IVolume from "../assets/volume.png";

const LiveStreams = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const settedSmothies = useAppSelector(
    (state) => state.general.settedSmothies
  );

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
          Most Shared Stream
        </Typography.Text>

        <div
          style={{
            display: "flex",
            marginLeft: "20px",
            alignItems: "center",
            background: "#F60000",
            borderRadius: "4px",
            padding: "0 8px",
            height: "20px",
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
            Live Streams
          </Typography.Text>
        </div>
      </div>
      <Row gutter={[16, 16]}>
        <Col span={14}>
          <div
            className={styles["videoWrapper"]}
            style={{ position: "relative" }}
          >
            {/* <Image
          className={styles["tradeVideo"]}
          width="100%"
          height="375px"
          src={ITrade}
          preview={false}
        /> */}
            <ReactPlayer
              width="100%"
              height="380px"
              className={styles["videoWrapper"]}
              url={ITradeVideo}
              playing
              loop
              controls
              muted
              style={{ objectFit: "cover" }}
            />
            {/* <Image
          style={{
            position: "absolute",
            bottom: "130px",
            left: "10px",
            zIndex: "1000",
          }}
          width="80px"
          height="80px"
          src={IStreamer}
          preview={false}
        /> */}
            <div className={styles["videoController"]}>
              <div className={styles.blur}></div>
              {/* <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              zIndex: "1000",
            }}
          >
            <Image
              src={IPouse}
              preview={false}
              style={{
                width: "20px",
                height: "20px",
              }}
            />
            <Typography.Text type="secondary">01:35:45</Typography.Text>
            <Image
              src={IVolume}
              preview={false}
              width="15px"
              height="15px"
              style={{
                // marginRight: "10px",
                marginBottom: "5px",
                opacity: "0.6",
              }}
            />
          </div> */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  // gap: "10px",
                  width: "100%",
                  justifyContent: "space-between",
                  // marginLeft: "auto",
                }}
              >
                <Button
                  // size="small"
                  shape="circle"
                  icon={<LeftOutlined style={{ fontSize: "10px" }} />}
                  style={{
                    background: "rgba(255, 255, 255, 0.20)",
                  }}
                ></Button>
                <Button
                  // size="small"
                  shape="circle"
                  icon={<RightOutlined style={{ fontSize: "10px" }} />}
                  style={{
                    background: "rgba(255, 255, 255, 0.20)",
                  }}
                ></Button>
              </div>
            </div>
          </div>
        </Col>
        <Col span={10}>
          <div
            style={{
              borderRadius: "16px",
              background:
                appCustomization.theme === "dark"
                  ? "rgba(53, 56, 64, 0.52)"
                  : "#F1F1F1",
              height: "100%",
              padding: "16px",
            }}
          >
            <div style={{ marginBottom: "12px" }}>
              <Typography.Title level={3}>Solana AI plays</Typography.Title>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Badge dot offset={[-5, 26]} status="success">
                  <Avatar
                    src={IStreamer}
                    size={30}
                    shape="circle"
                    icon={<UserOutlined />}
                  />
                </Badge>
                <Typography.Text
                  style={{
                    color: "#FFF;",
                    fontSize: "14px",
                    marginLeft: "10px",
                  }}
                  underline
                >
                  Recrent
                </Typography.Text>
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
              </div>
            </div>
            <div style={{ marginTop: "10px" }}>
              <div>
                <Table
                  scroll={{ y: "auto" }}
                  tableLayout="fixed"
                  pagination={false}
                  dataSource={[
                    {
                      Ticker: "$GOAT",
                      CA: "CzLSujWBLFsSjncfkh59rUFqvafWcY5tzedWJSuypump",
                      Rating: "4/10",
                      EntryPrice: "0.23",
                      Color: "#FFDD00",
                      FDV: "349m",
                      TargetFDV: "519m",
                      Web: "https://goat.cx/",
                      Dex: " https://dexscreener.com/solana/9tb2ohu5p16bpbarqd3n27wnkf51ukfs8z1gzzldxvzw",
                    },
                    {
                      Ticker: "$KINGLANAND",
                      CA: "HeJUFDxfJSzYFUuHLxkMqCgytU31G6mjP4wKviwqpump",
                      Rating: "9/10",
                      EntryPrice: "1.53",
                      Color: "#FFDD00",
                      FDV: "42m",
                      TargetFDV: "69m",
                      Web: "https://echochambers.ai/",
                      Dex: "https://dexscreener.com/solana/2ur2gzkshap8xj33qss7c5zutd9mrjvrgwohr2q7t1sv",
                    },
                    {
                      Ticker: "$GRIFFAIN",
                      CA: "KENJSUYLASHUMfHyy5o4Hp2FdNqZg1AsUPhfH2kYvEP",
                      Rating: "8/10",
                      EntryPrice: "0.81",
                      Color: "#00C853",
                      FDV: "434m",
                      TargetFDV: "420m",
                      Web: "https://griffain.com/ ",
                      Dex: "https://dexscreener.com/solana/cpsmssqi3p9vmvnqxrdwvbsbcwyuhbggncrw7morbq3g",
                    },
                    {
                      Ticker: "$FARTCOIN",
                      CA: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
                      Rating: "9/10",
                      EntryPrice: "1.22",
                      Color: "#00C853",
                      FDV: "1bn",
                      TargetFDV: "1.1bn",
                      Web: "https://www.infinitebackrooms.com/dreams/conversation-1721540624-scenario-terminal-of-truths-txt",
                      Dex: "https://dexscreener.com/solana/bzc9nzfmqkxr6fz1dbph7bdf9broyef6pnzesp7v5iiw",
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
                      width: 120,
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
                                  src={XIcon}
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
                      width: 110,
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
                                  : "#E5E5E5",
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
                      width: 70,
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
                        <Tooltip
                          placement="topLeft"
                          title={"Fully diluted valuation during the analysis."}
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
                            <ExclamationCircleOutlined />
                          </Typography.Text>
                        </Tooltip>
                      ),
                      width: 100,
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
                            style={{ fontSize: "10px" }}
                          >
                            ${record.FDV}
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
                      dataIndex: "CreateSmoothie",
                      key: "CreateSmoothie",
                      onHeaderCell: () => ({
                        style: { textAlign: "center" },
                      }),
                      onCell: () => ({
                        style: { textAlign: "center" },
                      }),
                      width: 120,
                      render: (_: any, record: any) => {
                        return (
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
                            }}
                            onClick={() => {
                              dispatch(setIsAddSmothieModalOpen(true));
                              dispatch(setAddSmothieName(record?.Ticker));
                            }}
                          >
                            {!settedSmothies[record?.Ticker]?.value && (
                              <Image
                                src={IPlus}
                                preview={false}
                                style={{
                                  width: "15px",
                                  height: "15px",
                                  marginRight: "5px",
                                }}
                              />
                            )}

                            {settedSmothies[record?.Ticker]?.value ? (
                              <Typography.Text
                                ellipsis={{
                                  tooltip: `${
                                    settedSmothies[record?.Ticker]?.type
                                  }  ${settedSmothies[record?.Ticker]?.value}`,
                                }}
                                style={{ fontSize: "10px", width: "80px" }}
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
                        );
                      },
                    },
                  ]}
                />
                {/* {[
              {
                name: "$GOAT",
                copy: "da4g...54t76",
                number: "9/10",
              },
              {
                name: "$KINGLAND",
                copy: "434g...h4t5f1",
                number: "5/10",
              },
              {
                name: "$NICK",
                copy: "424u...54t7f9",
                number: "2/10",
              },
            ].map((e) => (
              <div>
                <Divider style={{ margin: "5px 0" }} />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography.Text
                    ellipsis
                    style={{ fontSize: "10px", width: "15%" }}
                  >
                    {e.name}
                  </Typography.Text>
                  <div
                    style={{
                      background: "#323232",
                      borderRadius: "16px",
                      padding: "2px 10px",
                      margin: "0 20px 0 50px",
                    }}
                  >
                    <Image
                      src={IDoc}
                      preview={false}
                      style={{
                        width: "15px",
                        height: "15px",
                        marginRight: "5px",
                      }}
                    />
                    <Typography.Text style={{ fontSize: "10px" }}>
                      {e.copy}
                    </Typography.Text>
                  </div>
                  <div>
                    <Typography.Text
                      type="success"
                      style={{ fontSize: "10px" }}
                    >
                      {e.number}
                    </Typography.Text>
                  </div>
                  <div
                    style={{
                      borderRadius: "16px",
                      border: "1px solid #AE1FCE",
                      padding: "2px 5px",
                      marginLeft: "auto",
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
              </div>
            ))} */}

                <Button
                  onClick={() => navigate(`/liveStreams/1`)}
                  style={{
                    marginTop: "20px",
                    width: "100%",
                    borderRadius: "16px",
                    background: "#00C853",
                    height: "35px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Typography.Text style={{ color: "#FFFFFF" }}>
                    Go to Stream
                  </Typography.Text>
                  <div
                    style={{
                      padding: "8px",
                      borderRadius: "50%",
                      height: "25px",
                      width: "25px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginLeft: "auto",
                      position: "absolute",
                      right: "10px",
                    }}
                  >
                    <ArrowRightOutlined style={{ color: "#FFFFFF" }} />
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      {/* ------Live streams------- */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "24px 0 10px",
          justifyContent: "space-between",
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
          Live streams
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: "12px",
            lineHeight: "22px",
            color: "#1F6FCE",
          }}
        >
          Show more
        </Typography.Text>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          // overflowX: "scroll",
          width: "100%",
          overflow: "auto",
          position: "relative",
        }}
      >
        {[
          {
            img: IStream1,
            viewers: "16k",
            avatar: avatar1,
            name: "Bitcoin cash TV",
            description: "Dimitri Licence ",
          },
          {
            img: IStream2,
            viewers: "12k",
            avatar: avatar2,
            name: "Cryptotoking",
            description: "Dream",
          },
          {
            img: IStream3,
            viewers: "18k",
            avatar: avatar3,
            name: "TreaderSamwise ...",
            description: "Adam Smith",
          },
          {
            img: IStream4,
            viewers: "19k",
            avatar: avatar4,
            name: "TreaderSamwise ...",
            description: "Tarik",
          },
          {
            img: IStream5,
            viewers: "24k",
            avatar: avatar5,
            name: "TreaderSamwE",
            description: "John Doe",
          },
        ].map((e) => (
          <div
            style={{
              position: "relative",
              width: "300px",
              paddingBottom: "10px",
            }}
          >
            <Image
              onClick={() => navigate(`/liveStreams/1`)}
              width="280px"
              height="180px"
              style={{ cursor: "pointer" }}
              src={e.img}
              preview={false}
            />
            <div
              style={{
                display: "flex",
                alignItems: "center",
                background: "#F60000",
                borderRadius: "4px",
                padding: "0 8px",
                height: "20px",
                position: "absolute",
                top: "10px",
                left: "10px",
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
                  fontWeight: "600",
                  lineHeight: "22px",
                  color: "#FFF",
                }}
              >
                Live
              </Typography.Text>
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "70px",
                left: "10px",
                padding: "3px 8px",
                borderRadius: "8px",
                background: "rgba(53, 56, 64, 1)",
              }}
            >
              <Typography.Text style={{ color: "#FFFFFF" }}>
                {e.viewers} viewers
              </Typography.Text>
            </div>
            <div
              style={{
                marginTop: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  size={35}
                  shape="circle"
                  icon={<UserOutlined />}
                  src={e.avatar}
                />
                <div style={{ marginLeft: "10px" }}>
                  <div>
                    <Typography.Text
                      style={{
                        fontSize: "14px",
                        fontWeight: "600",
                        lineHeight: "22px",
                        // color: "#FFF",
                      }}
                    >
                      {e.name}
                    </Typography.Text>
                  </div>
                  <Typography.Text
                    style={{
                      fontSize: "12px",
                      fontWeight: "500",
                      lineHeight: "18px",
                      // color: "#FFF",
                    }}
                  >
                    {e.description}
                  </Typography.Text>
                </div>
              </div>
              <Button
                onClick={() => navigate(`/liveStreams/1`)}
                style={{
                  background: "#00C853",
                  borderRadius: "16px",
                  height: "20px",
                  color: "#FFF",
                }}
              >
                Watch
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* ------finished streams------- */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          margin: "24px 0 10px",
          justifyContent: "space-between",
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
          Finished Streams
        </Typography.Text>
        <Typography.Text
          style={{
            fontSize: "12px",
            lineHeight: "22px",
            color: "#1F6FCE",
          }}
        >
          Show more
        </Typography.Text>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          // overflowX: "scroll",
          width: "100%",
          overflow: "auto",
          position: "relative",
        }}
      >
        {[
          {
            avatar: Favatar1,
            name: "Bitcoin cash TV",
            total: "456,453",
            performance: "+5353",
            title: "Coinstrack",
            color: "#00C853",
          },
          {
            avatar: Favatar2,
            name: "Bitcoin cash TV",
            total: "28,466",
            performance: "+412",
            title: "ZCoin",
            color: "#00C853",
          },
          {
            avatar: Favatar3,
            name: "Cryptotoking",
            total: "231",
            performance: "-33",
            title: "BTC45",
            color: "#E91916",
          },
          {
            avatar: Favatar4,
            name: "Bitcoin cash TV",
            total: "349",
            performance: "-35",
            title: "Coinstrack",
            color: "#E91916",
          },
        ].map((e) => (
          <div
            style={{
              position: "relative",
              minWidth: "371px",
              background: "#010118",
              height: "218px",
              borderRadius: "16px",
            }}
          >
            <div
              style={{
                padding: "15px 0 0 15px",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                size={35}
                shape="circle"
                icon={<UserOutlined />}
                src={e.avatar}
              />
              <Typography.Text
                style={{
                  fontSize: "14px",
                  fontWeight: "600",
                  lineHeight: "26spx",
                  color: "#FFF",
                  marginLeft: "15px",
                }}
              >
                {e.title}
              </Typography.Text>
            </div>
            <Divider style={{ margin: "15px 0" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "0 15px",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "18spx",
                  color: "#FFF",
                }}
              >
                Name:
              </Typography.Text>
              <div>
                <Typography.Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "18spx",
                    color: "#FFF",
                    marginRight: "15px",
                  }}
                >
                  {e.name}
                </Typography.Text>
                <RightOutlined style={{ color: "#1F6FCE" }} />
              </div>
            </div>
            <Divider style={{ margin: "15px 0" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "0 15px",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "18spx",
                  color: "#FFF",
                }}
              >
                Total smoothies created:
              </Typography.Text>
              <div>
                <Typography.Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "18spx",
                    color: "#00C853",
                    marginRight: "15px",
                  }}
                >
                  ${e.total}
                </Typography.Text>
                <RightOutlined style={{ color: "#1F6FCE" }} />
              </div>
            </div>
            <Divider style={{ margin: "15px 0" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                padding: "0 15px",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: "12px",
                  fontWeight: "400",
                  lineHeight: "18spx",
                  color: "#FFF",
                }}
              >
                Performance::
              </Typography.Text>
              <div>
                <Typography.Text
                  style={{
                    fontSize: "12px",
                    fontWeight: "400",
                    lineHeight: "18spx",
                    color: e.color,
                    marginRight: "15px",
                  }}
                >
                  {e.performance}%
                </Typography.Text>
                <RightOutlined style={{ color: "#1F6FCE" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveStreams;
