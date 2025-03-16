/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "assets.parqet.com",
				port: "",
				pathname: "/logos/**",
			},
		],
	},
}

export default nextConfig
