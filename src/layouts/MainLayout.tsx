/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../components/navbar/Navbar";
import Sidebar from "../components/sidebar/Sidebar";
import { useAppSelector } from "../store/hooks";
import styles from "./mainLayout.module.scss";
import {
  Avatar,
  Badge,
  Button,
  Col,
  Divider,
  Image,
  Layout,
  Row,
  Typography,
} from "antd";
import ITrade from "../assets/image.png";
import IPouse from "../assets/pause.png";
import IDoc from "../assets/Document-1-Copy.png";
import IPlus from "../assets/Pluse ellipse.svg";
import logo from "../assets/Smoothie logo 1.png";
import IStream from "../assets/asd.png";
import {
  ArrowRightOutlined,
  EyeOutlined,
  HeartFilled,
  LeftOutlined,
  RightOutlined,
  UserOutlined,
} from "@ant-design/icons";

const MainLayout = () => {
  const isSidebarOpen = useAppSelector((state) => state.general.isSidebarOpen);

  return (
    <Layout style={{ minHeight: "100vh", padding: "16px 10px" }} id="body">
      <Sidebar />
      <Layout
        className={styles["main-layout-container"]}
        style={{
          width: isSidebarOpen ? "calc(100% - 450px)" : "calc(100% - 200px)",
          margin: "0 0 0 10px",
          position: "relative",
        }}
      >
        <Navbar />
        <div
          style={{
            background: "rgb(19 19 19)",
            borderRadius: "16px",
            marginTop: "16px",
            height: "calc(100vh - 108px)",
            padding: "15px",
            overflow: "auto",
          }}
        >
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
            <Col span={15}>
              <div style={{ position: "relative" }}>
                <Image
                  width="100%"
                  height="270px"
                  src={ITrade}
                  preview={false}
                />
                <div
                  style={{
                    display: "flex",
                    position: "absolute",
                    alignItems: "center",
                    // justifyContent: "space-between",
                    width: "100%",
                    bottom: "20px",
                  }}
                >
                  <Image
                    src={IPouse}
                    preview={false}
                    style={{
                      width: "20px",
                      height: "20px",
                      marginRight: "10px",
                    }}
                  />
                  <div
                    style={{
                      height: "5px",
                      width: "80%",
                      borderRadius: "12px",
                      background: `linear-gradient(
                        to right,
                        blue 0 150px,
                        rgba(53, 56, 64, 0.52) 150px
                      )`,
                    }}
                  ></div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "20px",
                      marginLeft: "auto",
                    }}
                  >
                    <Button
                      size="small"
                      shape="circle"
                      icon={<LeftOutlined style={{ fontSize: "10px" }} />}
                      style={{
                        background: "rgba(255, 255, 255, 0.20)",
                      }}
                    ></Button>
                    <Button
                      size="small"
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
            <Col span={9}>
              <div
                style={{
                  borderRadius: "16px",
                  background: "rgba(53, 56, 64, 0.52)",
                  height: "100%",
                  padding: "16px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
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
                    <EyeOutlined style={{ fontSize: "14px", color: "white" }} />
                    <Typography.Text>2343</Typography.Text>
                  </div>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <div>
                    <Badge dot offset={[-5, 22]} status="success">
                      <Avatar
                        size={25}
                        shape="circle"
                        icon={<UserOutlined />}
                      />
                    </Badge>
                    <Typography.Text
                      style={{
                        color: "color: #FFF;",
                        fontSize: "10px",
                        marginLeft: "14px",
                      }}
                    >
                      Recrent
                    </Typography.Text>
                  </div>

                  <div style={{ marginTop: "10px" }}>
                    <Typography.Text style={{ fontSize: "12px" }}>
                      Cryptotoking Cash TV
                    </Typography.Text>
                  </div>
                  <div>
                    {[
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
                    ))}

                    <Button
                      style={{
                        marginTop: "20px",
                        width: "100%",
                        borderRadius: "16px",
                        background: "#00C853",
                        height: "25px",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <Typography.Text>Go to Stream</Typography.Text>
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
                        <ArrowRightOutlined />
                      </div>
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          {/* ------------- */}
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
                color: "#FFF",
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
            {[1, 2, 3, 4, 5, 6, 7].map(() => (
              <div
                style={{
                  position: "relative",
                  width: "260px",
                  paddingBottom: "10px",
                }}
              >
                <Image
                  width="260px"
                  height="180px"
                  src={IStream}
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
                    background: "rgba(53, 56, 64, 0.52)",
                  }}
                >
                  <Typography.Text>12k viewers</Typography.Text>
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
                    <Avatar size={35} shape="circle" icon={<UserOutlined />} />
                    <div style={{ marginLeft: "10px" }}>
                      <div>
                        <Typography.Text
                          style={{
                            fontSize: "14px",
                            fontWeight: "600",
                            lineHeight: "22px",
                            color: "#FFF",
                          }}
                        >
                          Bitcoin cash TV
                        </Typography.Text>
                      </div>
                      <Typography.Text
                        style={{
                          fontSize: "12px",
                          fontWeight: "500",
                          lineHeight: "18px",
                          color: "#FFF",
                        }}
                      >
                        Dimitri Licence
                      </Typography.Text>
                    </div>
                  </div>
                  <Button
                    style={{
                      background: "#00C853",
                      borderRadius: "16px",
                      height: "20px",
                    }}
                  >
                    Watch
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* ------------- */}

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
                color: "#FFF",
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
            {[1, 2, 3, 4, 5].map(() => (
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
                  <Avatar size={35} shape="circle" icon={<UserOutlined />} />
                  <Typography.Text
                    style={{
                      fontSize: "14px",
                      fontWeight: "600",
                      lineHeight: "26spx",
                      color: "#FFF",
                      marginLeft: "15px",
                    }}
                  >
                    Coinstrack
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
                      Bitcoin cash TV
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
                        color: "#E91916",
                        marginRight: "15px",
                      }}
                    >
                      $456453
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
                      +5353%
                    </Typography.Text>
                    <RightOutlined style={{ color: "#1F6FCE" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
