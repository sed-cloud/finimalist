import { faWallet } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";

interface LoadAccountIconProps {
    connectionName: string;
    token: string;
    onSuccess: PlaidLinkOnSuccess;
}
export const LoadAccountIcon = ({ token, onSuccess }: LoadAccountIconProps) => {
    const config: PlaidLinkOptions = {
        token,
        onSuccess,
        // onExit
        // onEvent
    };

    const { open, ready, error } = usePlaidLink(config);


    return (
        <button className='
            transition-all 
            ease-in-out 
            durration-300

            bg-stone-200
            text-stone-900
            px-4
            rounded-xl
            hover:bg-emerald-500
            hover:text-emerald-50
            '
            onClick={() => { open() }} disabled={!ready}>
            <FontAwesomeIcon icon={faWallet} size={'lg'} />
        </button>
    )
}