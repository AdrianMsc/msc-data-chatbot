import React from 'react';

interface DownloadLinkProps {
	url: string;
	children: React.ReactNode;
}

export const DownloadLink: React.FC<DownloadLinkProps> = ({ url, children }) => {
	const handleDownload = (e: React.MouseEvent) => {
		e.preventDefault();
		// Create a temporary anchor element
		const link = document.createElement('a');
		link.href = url;
		link.setAttribute('download', ''); // This will trigger download instead of navigation
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<button
			onClick={handleDownload}
			className="bg-slate-200 p-3 rounded-lg flex items-center gap-1 hover:bg-slate-300 transition duration-200 my-2"
			title="Download file"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				className="h-4 w-4 inline mr-1"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
				/>
			</svg>
			{children?.toString().split('/').pop()}
		</button>
	);
};

// Utility function to detect if a URL points to a downloadable file
export const isDownloadableLink = (url: string): boolean => {
	if (!url) return false;
	try {
		const urlObj = new URL(url);
		const path = urlObj.pathname.toLowerCase();
		const extensions = [
			'.pdf',
			'.doc',
			'.docx',
			'.xls',
			'.xlsx',
			'.ppt',
			'.pptx',
			'.jpg',
			'.jpeg',
			'.png',
			'.gif',
			'.zip',
			'.rar',
			'.7z',
			'.mp3',
			'.mp4',
			'.avi',
			'.mov',
			'.txt',
			'.csv',
			'.json',
			'.xml'
		];
		return extensions.some((ext) => path.endsWith(ext));
	} catch {
		return false;
	}
};
