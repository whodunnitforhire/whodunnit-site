export default function SectionHeader(props: { value: string }) {
  return (
    <div className="container p-0 space-y-3">
      <div className="w-12 h-[3px] bg-foreground mx-auto" />
      <h3 className="tracking-wider font-bold capitalize text-center mx-auto text-xl">
        {props.value}
      </h3>
    </div>
  );
}
