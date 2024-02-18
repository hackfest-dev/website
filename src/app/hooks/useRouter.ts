// useRouter.js
import { AppRouterInstance, NavigateOptions } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import { useRouter as useRouterOG } from 'next/navigation';
import { RouteChangeCustomEvent } from '../../components/routerEventsWorkAround/customLink';


const useRouter: () => AppRouterInstance = () => {
    const router = useRouterOG()

    const pushOG = router.push

    const customPush = (href: string, options?: NavigateOptions | undefined) => {
        window.dispatchEvent(
            new CustomEvent("routeChangeStart", {
                detail: { href: new URL(href, window.location.href).pathname },
            } as RouteChangeCustomEvent)
        );
        pushOG(href, options);
    };

    router.push = customPush

    return router
}

export default useRouter
