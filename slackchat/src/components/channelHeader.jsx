import { useTranslation } from "react-i18next";

export default function ChannelHeader({ channel, messages }) {
  const { t } = useTranslation();

  return (
    <div className="bg-light mb-4 p-3 shadow-sm small">
      <p className="m-0"><b>{`# ${channel?.name}`}</b></p>
      <span className="text-muted">{t("messages.messages", { count: messages.length })}</span>
    </div>
  );
}
