"use client"

import { Radio, RadioGroup } from "@nextui-org/react"
import { useLocalStorage } from "@uidotdev/usehooks"

export function GenderSelecter() {
  const [selected, setSelected] = useLocalStorage<string | null>("gender", null)

  return (
    <div>
      <RadioGroup
        size="sm"
        label="Select gender"
        description="Optional. This will determine your avatar in the results screen."
        orientation="horizontal"
        className="mx-auto text-sm"
        value={selected}
        onValueChange={(value) => {
          setSelected(value)
        }}
      >
        <Radio value="male">Male</Radio>
        <Radio value="female">Female</Radio>
        <Radio value="other">Other</Radio>
      </RadioGroup>
    </div>
  )
}
