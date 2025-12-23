import Image from "next/image";

export default function URLIcon({
	iconURL,
	size,
	className,
}: {
	iconURL?: string | null;
	size: number;
	className?: string;
}) {
	if (!iconURL) {
		return null;
	}
	return (
		<Image
			loading="lazy"
			className={className}
			width={size}
			height={size}
			priority={false}
			src={iconURL}
			alt=" "
		/>
	);
}
