import { useContext } from "react";

import { UserContext } from "../App";

const Radius = () =>
{
    const {settings, setSettings} = useContext(UserContext);

    function updateSettingsAndLog(settings, setSettings, updatedValues) {
        const updatedSettings = { ...settings, ...updatedValues };
        console.log(updatedSettings);
        setSettings(updatedSettings);
      }
    return (
        <>
        <div className="dropdown position-absolute top-0 start-50 translate-middle-x z-3 my-3">
  <button className="btn btn-light dropdown-toggle z-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Radius {settings.radius / 1609.34} mi
  </button>
  <ul className="dropdown-menu">
  <li
      className={`dropdown-item ${settings.radius / 1609.34 === 1 ? 'active' : ''}`}
      onClick={() => updateSettingsAndLog(settings, setSettings, { radius: 1 * 1609.34 })}
    >
      1m
    </li>

    <li
      className={`dropdown-item ${settings.radius / 1609.34 === 2.5 ? 'active' : ''}`}
      onClick={() => updateSettingsAndLog(settings, setSettings, { radius: 2.5 * 1609.34 })}
    >
      2.5m
    </li>
    <li
      className={`dropdown-item ${settings.radius / 1609.34 === 5 ? 'active' : ''}`}
      onClick={() => updateSettingsAndLog(settings, setSettings, { radius: 5 * 1609.34 })}
    >
      5m
    </li>
    <li
      className={`dropdown-item ${settings.radius / 1609.34 === 10 ? 'active' : ''}`}
      onClick={() => updateSettingsAndLog(settings, setSettings, { radius: 10 * 1609.34 })}
    >
      10m
    </li>
    <li
      className={`dropdown-item ${settings.radius / 1609.34 === 15 ? 'active' : ''}`}
      onClick={() => updateSettingsAndLog(settings, setSettings, { radius: 15 * 1609.34 })}
    >
      15m
    </li>
  </ul>
</div>
        </>
    )
}

export default Radius;