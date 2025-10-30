import React, { useEffect, useState } from "react";
import {
  Card,
  Tag,
  Button,
  Descriptions,
  Space,
  Typography,
  Divider,
  Row,
  Col,
} from "antd";
import {
  DollarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
  CalendarOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useParams } from "react-router-dom";
import { getAPI } from "../../../utils/getAPI";

const { Title, Paragraph, Text } = Typography;

export default function JobDetail() {
  const [jobData, setJobData] = useState({});
  const jobId = useParams();
  console.log(jobId);

  useEffect(() => {
    const fetchJobData = async () => {
      const job = await getAPI(`http://localhost:3001/jobs/${jobId.id}`);
      setJobData(job);
      console.log(job);
    };
    fetchJobData();
  }, [jobId]);


  const formatDescription = (desc) => {
    if (!desc) return null;
    const sectionKeywords = [
      "Top 3 Reasons",
      "Job Description",
      "Mô tả công việc",
      "Your Skills",
      "Required Skills",
      "Should Have",
      "Nice to have",
      "Why You'll Love",
      "Yêu cầu",
      "Quyền lợi",
      "Trách nhiệm",
      "Nhiệm vụ",
      "Requirements",
      "Benefits",
      "What We Offer",
      "Job Responsibilities",
      "Về công ty",
      "Vị trí",
      "Chế độ",
      "Đãi ngộ",
      "Lợi ích",
      "Công việc",
    ];

    const lines = desc.split("\n").filter((line) => line.trim() !== "");
    
    const sections = [];
    let currentSection = null;

    lines.forEach((line, index) => {
      const trimmedLine = line.trim();

      // Kiểm tra xem dòng này có phải là tiêu đề section không
      const isTitle = sectionKeywords.some(
        (keyword) =>
          trimmedLine.includes(keyword) ||
          trimmedLine.endsWith(":") ||
          (trimmedLine.length < 50 &&
            !trimmedLine.startsWith("-") &&
            index === 0) ||
          (trimmedLine.length < 50 &&
            !trimmedLine.startsWith("-") &&
            lines[index - 1] === "")
      );

      if (isTitle) {
        // Tạo section mới
        if (currentSection) {
          sections.push(currentSection);
        }
        currentSection = {
          title: trimmedLine.replace(":", ""),
          content: [],
        };
      } else if (currentSection) {
        // Thêm nội dung vào section hiện tại
        currentSection.content.push(trimmedLine);
      } else {
        // Nếu chưa có section nào, tạo section mặc định
        currentSection = {
          title: "Thông tin công việc",
          content: [trimmedLine],
        };
      }
    });

    // Thêm section cuối cùng
    if (currentSection) {
      sections.push(currentSection);
    }

    // Render sections
    return sections.map((section, sectionIndex) => (
      <div key={sectionIndex} style={{ marginBottom: 32 }}>
        <Title
          level={4}
          style={{
            color: "#1890ff",
            marginBottom: 16,
            fontSize: 18,
            fontWeight: 600,
          }}
        >
          {section.title}
        </Title>
        <div style={{ paddingLeft: 8 }}>
          {section.content.map((line, lineIndex) => {
            // Kiểm tra dòng có phải bullet point không
            const isBullet =
              line.startsWith("-") ||
              line.startsWith("•") ||
              line.startsWith("+");

            if (isBullet) {
              return (
                <Paragraph
                  key={lineIndex}
                  style={{
                    marginBottom: 12,
                    paddingLeft: 24,
                    position: "relative",
                  }}
                >
                  <CheckCircleOutlined
                    style={{
                      color: "#52c41a",
                      marginRight: 8,
                      position: "absolute",
                      left: 0,
                      top: 4,
                    }}
                  />
                  <Text>{line.substring(1).trim()}</Text>
                </Paragraph>
              );
            } else {
              return (
                <Paragraph
                  key={lineIndex}
                  style={{
                    marginBottom: 12,
                    lineHeight: 1.8,
                  }}
                >
                  {line}
                </Paragraph>
              );
            }
          })}
        </div>
      </div>
    ));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        //   background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: "40px 20px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header Card */}
        <Card
          style={{
            marginBottom: 24,
            borderRadius: 12,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <Row gutter={[24, 24]} align="middle">
            <Col xs={24} md={16}>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Title level={2} style={{ margin: 0, color: "#1890ff" }}>
                  {jobData.name}
                </Title>
                <Space size={[8, 8]} wrap>
                  {jobData.tags ? (
                    jobData.tags.map((tag) => (
                      <Tag
                        color="blue"
                        key={tag}
                        style={{ fontSize: 14, padding: "4px 12px" }}
                      >
                        {tag}
                      </Tag>
                    ))
                  ) : (
                    <Tag color="blue">Đang tải...</Tag>
                  )}
                </Space>
                <Space size={24} wrap>
                  <Space>
                    <DollarOutlined
                      style={{ color: "#52c41a", fontSize: 18 }}
                    />
                    <Text strong style={{ fontSize: 16 }}>
                      ${jobData.salary}
                    </Text>
                  </Space>
                  <Space>
                    <EnvironmentOutlined
                      style={{ color: "#ff4d4f", fontSize: 18 }}
                    />
                    <Text style={{ fontSize: 16 }}>
                      {jobData.city ? jobData.city.join(", ") : "Đang tải..."}
                    </Text>
                  </Space>
                  <Space>
                    <ClockCircleOutlined
                      style={{ color: "#faad14", fontSize: 18 }}
                    />
                    <Tag color={jobData.status ? "success" : "default"}>
                      {jobData.status ? "Đang tuyển" : "Đã đóng"}
                    </Tag>
                  </Space>
                </Space>
              </Space>
            </Col>
            <Col xs={24} md={8}>
              <Space direction="vertical" size={12} style={{ width: "100%" }}>
                <Button
                  type="primary"
                  size="large"
                  block
                  style={{
                    height: 48,
                    fontSize: 16,
                    fontWeight: 600,
                    borderRadius: 8,
                  }}
                >
                  Ứng Tuyển Ngay
                </Button>
                <Space style={{ width: "100%", justifyContent: "center" }}>
                  <Button icon={<HeartOutlined />} shape="circle" />
                  <Button icon={<ShareAltOutlined />} shape="circle" />
                </Space>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* Main Content */}
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            <Card
              title={
                <Title level={3} style={{ margin: 0 }}>
                  Mô Tả Công Việc
                </Title>
              }
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              {jobData.description
                ? formatDescription(jobData.description)
                : "Đang tải..."}
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Thông Tin Chung
                </Title>
              }
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
                marginBottom: 24,
              }}
            >
              <Descriptions column={1} size="small">
                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      Ngày đăng
                    </Space>
                  }
                >
                  {jobData.createAt}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <CalendarOutlined />
                      Cập nhật
                    </Space>
                  }
                >
                  {jobData.updateAt}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <EnvironmentOutlined />
                      Địa điểm
                    </Space>
                  }
                >
                  {jobData.city ? jobData.city.join(", ") : "Đang tải..."}
                </Descriptions.Item>
                <Descriptions.Item
                  label={
                    <Space>
                      <DollarOutlined />
                      Mức lương
                    </Space>
                  }
                >
                  <Text strong style={{ color: "#52c41a" }}>
                    ${jobData.salary}
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Card>

            <Card
              title={
                <Title level={4} style={{ margin: 0 }}>
                  Kỹ Năng Yêu Cầu
                </Title>
              }
              style={{
                borderRadius: 12,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <Space size={[8, 8]} wrap>
                {jobData.tags ? (
                  jobData.tags.map((tag) => (
                    <Tag
                      color="processing"
                      key={tag}
                      style={{
                        fontSize: 14,
                        padding: "6px 16px",
                        borderRadius: 20,
                      }}
                    >
                      {tag}
                    </Tag>
                  ))
                ) : (
                  <Tag color="processing">Đang tải...</Tag>
                )}
              </Space>
              <Divider />
              <Button
                type="primary"
                block
                size="large"
                style={{ borderRadius: 8 }}
              >
                Ứng Tuyển Ngay
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}
