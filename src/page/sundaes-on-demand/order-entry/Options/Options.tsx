import type { FC } from "react";
import { useEffect, useState } from "react";
import { OptionModel } from "../../../../model/OptionModel";
import ToppingsOptions from "./ToppingsOptions";
import { ScoopsModel } from "../../../../model/ScoopsModel";
import ScoopOptions from "./ScoopOptions";
import { ToppingsModel } from "../../../../model/ToppingsModel";
import AlertBanner from "../../../../feeature/sundaes-on-demand/components/AlertBanner";

interface OptionsProps {
  optionType: "scoops" | "toppings";
}

const Options: FC<OptionsProps> = ({ optionType }) => {
  // const { data, isLoading, error } = useQuery<Readonly<Scoop[]>, Error>(
  //   ["scoopOptions"],
  //   () =>
  //     fetch("*/scoops", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json"
  //       }
  //     }).then((res) => {
  //       if (!res.ok) {
  //         throw new Error(res.statusText);
  //       }
  //
  //       return res.json();
  //     }),
  //   {
  //     refetchOnWindowFocus: false,
  //     refetchOnReconnect: false
  //   }
  // );
  //
  // if (isLoading) return "Loading...";
  // if (error) return `Error: ${error.message}`;

  const [options, setOptions] = useState<Readonly<OptionModel[]>>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`*/${optionType}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        const data: Readonly<OptionModel[]> = await response.json();
        setOptions(data);
      } catch (error) {
        setError(true);
      }
    })();
  }, [optionType]);

  if (error) return <AlertBanner />;

  return (
    <ul>
      {optionType === "scoops"
        ? (options as readonly ScoopsModel[]).map((scoop) => (
            <ScoopOptions key={scoop.name} {...scoop} />
          ))
        : (options as readonly ToppingsModel[]).map((topping) => (
            <ToppingsOptions key={topping.name} {...topping} />
          ))}
    </ul>
  );
};

export default Options;
