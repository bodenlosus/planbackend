import { to_display_string } from "@/lib/cash_display_string";
import { WinLossIndicator } from "./indicator";

interface props {
  display: string;
  current: number;
  reference?: number | Array<number>;
  labels?: Array<string>;
}
export function StockStat({ display, current, reference, labels }: props) {
  return (
    <div className="">
      <h1 className=" text-xs">{display}</h1>
      <DisplayTypeBased
        current={current}
        reference={reference}
        labels={labels}
      />
    </div>
  );
}

interface DisplayTypeBasedT {
  current: number;
  reference?: number | Array<number>;
  labels?: Array<string>;
}

function DisplayTypeBased({ current, reference, labels }: DisplayTypeBasedT) {
  if (!reference) {
    return <DiplayWithoutReference current={current} />;
  }
  if (Array.isArray(reference)) {
    return (
      <DiplayWithReferences
        current={current}
        reference={reference}
        labels={labels}
      />
    );
  }
  return (
    <DiplayWithReference
      current={current}
      reference={reference}
      label={labels?.at(0)}
    />
  );
}

interface DiplayWithoutReferenceT {
  current: number;
}

function DiplayWithoutReference({ current }: DiplayWithoutReferenceT) {
  return (
    <span className="flex flex-row gap-x-2 gap-y-0 flex-wrap">
      <span className="flex flex-row gap-1">
        <span className="text-lg font-semibold number">
          {to_display_string(current)}
        </span>
      </span>
    </span>
  );
}

interface DiplayWithReferenceT extends DiplayWithoutReferenceT {
  reference: number;
  label?: string;
}

function DiplayWithReference({
  current,
  reference,
  label,
}: DiplayWithReferenceT) {
  const relativeChange = ((current - reference) / reference) * 100;
  return (
    <span className="flex flex-row gap-x-2 gap-y-0 flex-wrap">
      <span className="flex flex-row gap-1">
        <span className="flex align-baseline">
          <WinLossIndicator sign={relativeChange} />
        </span>

        <span className="text-lg font-semibold number">
          {to_display_string(current)}
        </span>
      </span>
      <span className="text-xs font-semibold text-muted-foreground number float-right">
        {relativeChange > 0 ? "+" : "-"}
        {Math.abs(relativeChange).toFixed(2)}% {label}
      </span>
    </span>
  );
}

interface DiplayWithReferencesT<T extends Array<number>>
  extends DiplayWithoutReferenceT {
  reference: T;
  labels?: { [K in keyof T]: string };
}

function DiplayWithReferences<T extends Array<number>>({
  current,
  reference,
  labels,
}: DiplayWithReferencesT<T>) {
  const relativeChange = ((current - reference[0]) / reference[0]) * 100;
  return (
    <span className="flex flex-row gap-x-2 gap-y-0 flex-wrap">
      <span className="flex flex-row gap-1">
        <span className="flex align-baseline">
          <WinLossIndicator sign={relativeChange} />
        </span>

        <span className="text-xl font-semibold number">
          {to_display_string(current)}
        </span>
      </span>
      <span className="flex flex-row gap-1 text-sm flex-wrap">
        {reference.map((value, index) => {
          const rc = ((current - value) / value) * 100;
          return (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: <No soltution here>
              key={index}
              className="mb-px font-semibold text-muted-foreground number float-right text-nowrap"
            >
              {rc > 0 ? "+" : "-"}
              {Math.abs(rc).toFixed(2)}% {labels?.at(index)}
            </span>
          );
        })}
      </span>
    </span>
  );
}
