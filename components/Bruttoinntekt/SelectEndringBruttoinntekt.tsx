import { Select } from '@navikt/ds-react';
import { ChangeEvent, ReactNode, useCallback } from 'react';

import begrunnelseEndringBruttoinntekt from './begrunnelseEndringBruttoinntekt';
import begrunnelseEndringBruttoinntektTekster from './begrunnelseEndringBruttoinntektTekster';

interface SelectEndringBruttoinntektProps {
  onChangeBegrunnelse: (verdi: string) => void;
  error: ReactNode;
  id: string;
  nyInnsending: boolean;
  defaultValue?: string;
}

export default function SelectEndringBruttoinntekt(props: SelectEndringBruttoinntektProps) {
  const begrunnelseKeys = Object.keys(begrunnelseEndringBruttoinntekt).filter(
    (endring) => (endring !== 'Tariffendring' && props.nyInnsending === true) || props.nyInnsending === false
  );

  const changeHandler = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      props.onChangeBegrunnelse(event.target.value);
    },
    [props]
  );

  return (
    <>
      <Select
        label={'Velg endringsårsak'}
        onChange={changeHandler}
        id={props.id}
        error={props.error}
        defaultValue={props.defaultValue}
      >
        <option value=''>Velg begrunnelse</option>
        {begrunnelseKeys.map((begrunnelseKey) => (
          <option value={begrunnelseKey} key={begrunnelseKey}>
            {begrunnelseEndringBruttoinntektTekster[begrunnelseKey]}
          </option>
        ))}
      </Select>
    </>
  );
}
