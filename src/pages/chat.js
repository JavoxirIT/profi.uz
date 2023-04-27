import React, { useState } from "react";
import { useRouter } from "next/router";
import { Avatar, Button, Form, Input, List } from "antd";
import moment from "moment";
import { PageWrapperSingle } from "components/PageWrapperSingle";

export const CommentList = ({ comments }) => {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={({ content }) => console.log("props", content)}
    />
  );
};

export const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <Input.TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary"
      >
        Add Comment
      </Button>
    </Form.Item>
  </>
);

const Chat = ({ t }) => {
  const router = useRouter();
  const { query } = router;

  const [comments, setComments] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [value, setValue] = useState("");
  const handleSubmit = () => {
    if (!value) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setValue("");
      setComments([
        ...comments,
        {
          author: "Han Solo",
          avatar: "",
          content: <p>{value}</p>,
          datetime: moment(Date.now()).fromNow(),
        },
      ]);
    }, 1000);
  };
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <PageWrapperSingle title="Chat" t={t}>
      {comments.length > 0 && <CommentList comments={comments} />}

      <Avatar src="" alt="Han Solo" />
      <Editor
        onChange={handleChange}
        onSubmit={handleSubmit}
        submitting={submitting}
        value={value}
      />
    </PageWrapperSingle>
  );
};
export default Chat;
