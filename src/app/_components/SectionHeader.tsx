export default function SectionHeader(props: { value: string }) {
  return (
    <div className="container space-y-3 p-0">
      <div className="mx-auto h-[3px] w-12 bg-foreground" />
      <h3 className="mx-auto text-center text-xl font-bold tracking-wider capitalize">
        {props.value}
      </h3>
    </div>
  );
}
