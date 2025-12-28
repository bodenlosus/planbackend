export default function get_sign(x: number): "" | "+" | "-" {
	return x === 0 ? "" : x > 0 ? "+" : "-"
}
