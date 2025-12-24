import { StockStat } from "./stat";

type StockStatsProps<TStructure extends Record<string, string>> = {
	structure: TStructure;
	current: Record<keyof TStructure, number>;
	reference?: Partial<Record<keyof TStructure, number | Array<number>>>;
	labels?: Partial<Record<keyof TStructure, Array<string>>>;
	className?: string;
};

export default function StockStats<TStructure extends Record<string, string>>({
	structure,
	current,
	reference,
	labels,
}: StockStatsProps<TStructure>) {
	const stats = Object.entries(structure).map(([key, display]) => ({
		name: key,
		display,
		current: current[key],
		reference: reference ? reference[key] : undefined,
		labels: labels ? labels[key] : undefined,
	}));

	return stats.map((stat) => <StockStat key={stat.name} {...stat} />);
}
