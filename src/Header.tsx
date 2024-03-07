import { FunctionComponent } from "react";
import { useResource, useSolidAuth, useSubject } from "@ldo/solid-react";
import { SolidProfileShapeShapeType } from "./.ldo/solidProfile.shapeTypes";
const { Application } = require('@janeirodigital/interop-application');

const CLIENT_ID = 'http://localhost:3009/id.ttl';

export const Header: FunctionComponent = () => {
  const { session, login, logout, fetch } = useSolidAuth();

  const webIdResource = useResource(session.webId);
  const profile = useSubject(SolidProfileShapeShapeType, session.webId);
  let saiSession: unknown;
  const loggedInName = webIdResource?.isReading()
    ? "LOADING..."
    : profile?.fn
    ? profile.fn
    : session.webId;

    // let saiSession: unknown;
    const saiAuth = async () => {
      console.log('saiAuth');
      // if (saiSession) return;
      if (!session.webId) return;
      const webId = session.webId as string;
      const deps = { fetch, randomUUID: crypto.randomUUID.bind(crypto) };
      saiSession = await Application.build(webId, CLIENT_ID, deps);
      window.location.href = (saiSession as any).authorizationRedirectUri;
    }
      
  return (
    <header>
      {session.isLoggedIn ? (
        // Is the session is logged in
        <p>
          You are logged as {loggedInName}.{" "}
          <button onClick={logout}>Log Out</button>
          <button onClick={saiAuth}>SAI Auth</button>
        </p>
      ) : (
        // If the session is not logged in
        <p>
          You are not Logged In{" "}
          <button
            onClick={() => {
              // Get the Solid issuer the user should log into
              const issuer = prompt(
                "Enter your Solid Issuer",
                "http://localhost:3000"
              );
              if (!issuer) return;
              login(issuer, { clientId: CLIENT_ID });
            }}
          >
            Log In
          </button>
        </p>
      )}
      <hr />
    </header>
  );
};
