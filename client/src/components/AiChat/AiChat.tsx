/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./AiChat.module.scss";
import {
  Button,
  Col,
  Grid,
  Image,
  Input,
  Row,
  Tooltip,
  Typography,
} from "antd";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ArrowUpOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import logo1 from "../../assets/logo.png";
import InitialPrompts from "./components/InitialPrompts";
import { getCA } from "../../functions";
import { setAiButtonValue, setChats } from "../../store/general/generalSlice";
import Chatting from "./components/Chatting";
import ChatInterface from "../../components/ChatInterface";
const { useBreakpoint } = Grid;
const AiChat = () => {
  const dispatch = useAppDispatch();
  const screens = useBreakpoint();
  const appCustomization = useAppSelector(
    (state) => state.general.appCustomization
  );
  const settedSmothies = useAppSelector(
    (state) => state.general.settedSmothies
  );
  const lastEditedSmothieName = useAppSelector(
    (state) => state.general.lastEditedSmothieName
  );
  const aiButtonValue = useAppSelector((state) => state.general.aiButtonValue);
  const chats = useAppSelector((state) => state.general.chats);

  return (
    <Col span={24}>
      <ChatInterface />
      <div
        className={styles.container}
        style={{
          background:
            appCustomization.theme === "dark"
              ? "rgba(53, 56, 64, 0.52)"
              : "#F1F1F1",
          minHeight: chats?.length ? "400px" : undefined,
          display: chats?.length ? "flex" : undefined,
          flexDirection: chats?.length ? "column" : undefined,
          justifyContent: chats?.length ? "space-between" : undefined,
          padding: screens.lg ? "19px 68px 10px 68px" : "19px 20px 10px 20px",
        }}
      >
        {/* header */}
        {!chats?.length ? (
          <div className={styles.header}>
            <Image src={logo1} preview={false} width={50} height={50} />
            <Typography.Title level={3} style={{ textAlign: "center" }}>
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
                <QuestionCircleOutlined
                  style={{ fontSize: "12px", marginLeft: "3px" }}
                />
              </Button>
            </Tooltip>
          </div>
        ) : (
          ""
        )}

        {/* prompts */}
        {!chats?.length ? (
          <div className={styles.initPromptsContainer}>
            {/* {settedSmothies} */}
            {!lastEditedSmothieName ? (
              <InitialPrompts />
            ) : (
              <Row
                gutter={[10, 10]}
                style={{ marginTop: "10px", width: "auto" }}
              >
                {Object.entries(settedSmothies)
                  ?.map((e) => ({
                    text: `Swap ${e?.[1].value} ${e?.[1].type} to ${
                      e?.[0]
                    }, ${getCA(e?.[0])}`,
                    icon: (
                      <Image
                        width="15px"
                        height="15px"
                        src={logo1}
                        preview={false}
                      />
                    ),
                  }))
                  .map((e, index, data) => (
                    <Col
                      style={
                        screens.lg
                          ? index % 2 === 0 && index === data.length - 1
                            ? {
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }
                            : {}
                          : {
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }
                      }
                      span={
                        !screens.lg
                          ? 24
                          : index % 2 === 0 && index === data.length - 1
                          ? 24
                          : 12
                      }
                    >
                      <Button
                        onClick={() => dispatch(setAiButtonValue(e.text))}
                        style={{
                          width: screens.lg ? "auto" : "300px",
                          float: index % 2 === 0 ? "right" : "left",
                        }}
                        icon={e.icon}
                      >
                        <Typography.Text
                          ellipsis={
                            screens.lg ? undefined : { tooltip: e.text }
                          }
                        >
                          {e.text}
                        </Typography.Text>
                      </Button>
                    </Col>
                  ))}
              </Row>
            )}
          </div>
        ) : (
          <Chatting />
        )}

        {/* --------------------------------------- */}
        <div className={styles.buttonContainer}>
          <Input.TextArea
            onPressEnter={(e) => {
              e.preventDefault();
              if (e.key === "Enter") {
                dispatch(
                  setChats([
                    ...chats,
                    { request: (e.target as any).value, response: "" },
                  ])
                );
                dispatch(setAiButtonValue(""));
              }
            }}
            onChange={(e) => dispatch(setAiButtonValue(e.target.value))}
            value={aiButtonValue}
            autoSize={{ maxRows: 10, minRows: 1.4 }}
            className={styles.textArea}
            style={{
              background:
                appCustomization.theme === "dark"
                  ? "var(--black-2, #3F3F3F)"
                  : "var(--light-mode-background, #E5E5E5)",
              width: screens.lg ? "672px" : "300px",
            }}
            placeholder="Type a message . . ."
          />

          <Button
            onClick={() => {
              dispatch(
                setChats([...chats, { request: aiButtonValue, response: "" }])
              );
              dispatch(setAiButtonValue(""));
            }}
            className={styles.button}
            icon={<ArrowUpOutlined style={{ color: "#FFFFFF" }} />}
          />
        </div>
      </div>
    </Col>
  );
};

export default AiChat;
