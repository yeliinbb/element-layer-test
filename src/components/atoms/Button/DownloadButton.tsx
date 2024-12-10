import { StDownloadButton } from '../../../styles';

interface DownloadButtonProps {
  children: string;
}

const DownloadButton = ({ children }: DownloadButtonProps) => {
  return <StDownloadButton>{children}</StDownloadButton>;
};

export default DownloadButton;
