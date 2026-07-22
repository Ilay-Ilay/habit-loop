import { ChevronsUpDown, LogOut, UserRound } from "lucide-react";
import useAuth from "../providers/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { NavLink } from "react-router-dom";
import { useUI } from "../providers/UIContext";
import useLogout from "../hooks/useLogout";
import useProfile from "../hooks/useProfile";
import { supabase } from "../types/supabase-client";

function SidebarAccount() {
  const { session } = useAuth();
  const { mutate: logout } = useLogout();
  const { theme, setTheme } = useUI();
  const { data: profileData } = useProfile();
  const avatarURL = profileData?.avatar
    ? supabase.storage

        .from("avatars")

        .getPublicUrl(profileData.avatar).data.publicUrl
    : undefined;
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            nativeButton={false}
            render={
              <SidebarMenuButton
                size={"lg"}
                render={
                  <div className="flex w-full items-center gap-2">
                    <Avatar size="sm">
                      {profileData && <AvatarImage src={avatarURL} />}
                      <AvatarFallback>
                        {session?.user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 text-left">
                      <div className="flex items-center gap-1">
                        {profileData?.name && <span>{profileData.name}</span>}
                        {profileData?.last_name && (
                          <span>{profileData.last_name}</span>
                        )}
                      </div>
                      <span className="text-muted-foreground text-xs">
                        {session?.user.email}
                      </span>
                    </div>

                    <ChevronsUpDown className="size-4" />
                  </div>
                }
              />
            }
          />
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem
                render={
                  <NavLink to="/account">
                    <div className="flex items-center gap-1">
                      <UserRound />
                      Account
                    </div>
                  </NavLink>
                }
              ></DropdownMenuItem>
              <DropdownMenuSeparator />
            </DropdownMenuGroup>
            <DropdownMenuRadioGroup value={theme} onValueChange={setTheme}>
              <DropdownMenuLabel>Theme</DropdownMenuLabel>

              <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>

              <DropdownMenuRadioItem value="system">
                System
              </DropdownMenuRadioItem>
            </DropdownMenuRadioGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => logout()}>
                <LogOut />
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export default SidebarAccount;
