import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function SelectDropDown({ field }: any) {
  return (
    <Select
      // id={field.name}
      name={field.name}
      value={field.state.value}
      // onBlur={field.handleBlur}
      // onChange={(e) => field.handleChange(e.target.value)}
      onValueChange={(e) => field.handleChange(e)}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a expense type" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Expense Type</SelectLabel>
          <SelectItem value="food">Food</SelectItem>
          <SelectItem value="fuel">Vehicle/Fuel</SelectItem>
          <SelectItem value="entertainment">Entertainment</SelectItem>
          <SelectItem value="snacks">Snacks</SelectItem>
          <SelectItem value="sports">Sports/Play/Turf</SelectItem>
          <SelectItem value="misc">Misc</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
