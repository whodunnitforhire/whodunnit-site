export default function SectionHeader(props: { value: string }) {
  return (
    <div className="container p-0 space-y-4">
      <div className="w-12 h-[2px] bg-foreground mx-auto" />
      <h3 className="font-baskervville tracking-wider font-semibold uppercase text-center mx-auto text-lg">
        {props.value}
      </h3>
    </div>
  );
}
