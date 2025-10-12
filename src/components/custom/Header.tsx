import {
    NavigationMenu,
    NavigationMenuList,
    NavigationMenuItem,
    NavigationMenuLink,
    // NavigationMenuTrigger,
    // NavigationMenuViewport,
    // navigationMenuTriggerStyle
} from '@/components/ui/navigation-menu';

import { Box } from 'lucide-react';
import SearchBar from '@/components/custom/SearchBar';

function Header() {
    interface Menus {
        id: string,
        name: string,
        href: string
    }

    const menuList: Menus[] = [
        { id: '1', name: 'Movies', href: '/movies' },
        { id: '2', name: 'TV Shows', href: '/tv-shows' },
    ]

    const reloadPage = () => {
        window.location.reload();
    }

    return (
        <div className="header-container w-full bg-[#ffffff] border-b-[1px] border-[#8c8c8c33]">
            <div className="navbar">
                <div onClick={reloadPage} className="logo-container cursor-pointer">
                    <Box className="mr-[4px]" />
                    <div className="font-bold text-[18px]">Cinema Box</div>
                </div>

                <div>
                    <SearchBar />
                </div>

                <NavigationMenu className="hidden">
                    <NavigationMenuList>
                        {
                            menuList.map((menu) => (
                                <NavigationMenuItem className="menu-item" key={menu.id}>
                                    <NavigationMenuLink href='/' className="menu-link !font-bold">
                                        {menu.name}
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            ))
                        }
                    </NavigationMenuList>
                </NavigationMenu>
            </div>
        </div>
    )
}

export default Header;