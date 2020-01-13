import React from 'react';
import { FilledButton } from '../../components/elements/FilledButton';

type AuthorizeAppProps = {
  onAuthorize: () => void;
  onDecline: () => void;
};

export default (props: AuthorizeAppProps) => (
  <div>
    <p>Application needs permission to access your account.</p>
    <FilledButton className="w-full mt-4" text="Authorize" onClick={props.onAuthorize} />
  </div>
);
