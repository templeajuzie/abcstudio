import { IoStorefrontOutline } from "react-icons/io5";

export default function Sidebar() {
  return (
    <div>

<div className="sm:w-full sm:max-w-[18rem] z-[90] ">
		<input type="checkbox" id="sidebar-mobile-fixed" className="hidden sidebar-state" />
		<label htmlFor="sidebar-mobile-fixed" className="sidebar-overlay lg:hidden "></label>
		<aside className="justify-start h-full bg-white sidebar md:hidden lg:hidden sidebar-fixed-left sidebar-mobile max-sm:fixed max-sm:-translate-x-full">
			<section className="items-center p-4 sidebar-title">
				<svg fill="none" height="42" viewBox="0 0 32 32" width="42" xmlns="http://www.w3.org/2000/svg">
					<rect height="100%" rx="16" width="100%"></rect>
					<path clipRule="evenodd" d="M17.6482 10.1305L15.8785 7.02583L7.02979 22.5499H10.5278L17.6482 10.1305ZM19.8798 14.0457L18.11 17.1983L19.394 19.4511H16.8453L15.1056 22.5499H24.7272L19.8798 14.0457Z" fill="currentColor" fillRule="evenodd"></path>
				</svg>
				<div className="flex flex-col">
					<span>Acme</span>
					<span className="text-xs font-normal text-content2">Team Plan</span>
				</div>
			</section>
			<section className="sidebar-content">
				<nav className="rounded-md menu">
					<section className="px-4 menu-section">
						<span className="menu-title">Main menu</span>
						<ul className="menu-items">
							<li className="menu-item">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
									<path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
									<path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<span>General</span>
							</li>

							<li className="menu-item">
							<IoStorefrontOutline className="w-5 h-5 opacity-75"  />
						
								<a href="/store">Store</a>
							</li>
							<li>
								<input type="checkbox" id="menu-1" className="hidden menu-toggle" />
								<label className="justify-between menu-item" htmlFor="menu-1">
									<div className="flex gap-2">
										<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 opacity-75" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
											<path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
										</svg>
										<span>Account</span>
									</div>

									<span className="menu-icon">
										<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
											<path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
										</svg>
									</span>
								</label>

								<div className="menu-item-collapse">
									<div className="min-h-0">
										<label className="ml-6 menu-item menu-item-disabled">Change Email</label>
										<label className="ml-6 menu-item">Profile</label>
										<label className="ml-6 menu-item">Change Password</label>
									</div>
								</div>
							</li>
						</ul>
					</section>
					<div className="my-0 divider"></div>
					<section className="px-4 menu-section">
						<span className="menu-title">Settings</span>
						<ul className="menu-items">
							<li className="menu-item">
								<svg xmlns="http://www.w3.org/2000/svg" className="opacity-75" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M3 21l18 0"></path>
									<path d="M3 10l18 0"></path>
									<path d="M5 6l7 -3l7 3"></path>
									<path d="M4 10l0 11"></path>
									<path d="M20 10l0 11"></path>
									<path d="M8 14l0 3"></path>
									<path d="M12 14l0 3"></path>
									<path d="M16 14l0 3"></path>
								</svg>
								Payments
							</li>
							<li className="menu-item">
								<svg xmlns="http://www.w3.org/2000/svg" className="opacity-75" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M7 9m0 2a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z"></path>
									<path d="M14 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
									<path d="M17 9v-2a2 2 0 0 0 -2 -2h-10a2 2 0 0 0 -2 2v6a2 2 0 0 0 2 2h2"></path>
								</svg>
								Balances
							</li>
							<li className="menu-item">
								<svg xmlns="http://www.w3.org/2000/svg" className="opacity-75" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
									<path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
									<path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
									<path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
								</svg>
								Customers
							</li>
							<li className="menu-item">
								<svg xmlns="http://www.w3.org/2000/svg" className="opacity-75" width="22" height="22" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
									<path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
									<path d="M7 10l5 -6l5 6"></path>
									<path d="M21 10l-2 8a2 2.5 0 0 1 -2 2h-10a2 2.5 0 0 1 -2 -2l-2 -8z"></path>
									<path d="M12 15m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
								</svg>
								Products
							</li>
					
						</ul>
					</section>
				</nav>
			</section>
			<section className="justify-end pt-2 sidebar-footer bg-gray-2">
				<div className="my-0 divider"></div>
				<div className="z-50 flex w-full cursor-pointer dropdown h-fit hover:bg-gray-4">
						<div className="flex flex-row gap-4 p-4">
							<div className="avatar-square avatar avatar-md">
								<img src="https://i.pravatar.cc/150?img=30" alt="avatar" />
							</div>

							<div className="flex flex-col">
								<span>Sandra Marx</span>
							</div>
						</div>
					{/* <label className="flex w-full p-0 mx-2 cursor-pointer whites h-fit hover:bg-gray-4" tabIndex="0">
					</label>
					<div className="ml-2 bg-white shadow-sm dropdown-menu-right-top dropdown-menu">
						<a className="text-sm dropdown-item">Profile</a>
						<a tabIndex="-1" className="text-sm dropdown-item">Account settings</a>
						<a tabIndex="-1" className="text-sm dropdown-item">Change email</a>
						<a tabIndex="-1" className="text-sm dropdown-item">Subscriptions</a>
						<a tabIndex="-1" className="text-sm dropdown-item">Change password</a>
						<a tabIndex="-1" className="text-sm dropdown-item">Refer a friend</a>
						<a tabIndex="-1" className="text-sm dropdown-item">Settings</a>
					</div> */}
				</div>
			</section>
		</aside>
	</div>
      
    </div>
  )
}
