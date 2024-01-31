export default function SectionHeader(props: { value: string }) {
  return (
    <div className="container p-0 space-y-2">
      <div className="w-12 h-[1px] bg-black mx-auto" />
      <h3 className="font-baskervville font-semibold uppercase text-center mx-auto">
        {props.value}
      </h3>
    </div>
  );
}
