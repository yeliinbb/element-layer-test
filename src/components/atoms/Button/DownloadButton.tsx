import { StDownloadButton } from '../../../styles';

interface DownloadButtonProps {
  children: string;
  onClick: () => void;
}

const DownloadButton = ({ children, onClick }: DownloadButtonProps) => {
  return <StDownloadButton onClick={onClick}>{children}</StDownloadButton>;
};

export default DownloadButton;
