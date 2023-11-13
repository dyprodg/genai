const LandingLayout = ({
    children
}: {
    children: React.ReactNode
}) => {
    return(
        <main className="h-full overflow-auto bg-gradient-to-t from-indigo-500 via-violet-950 to-purple-700">
            <div className="mx-auto max-w-screen-xl h-full w-full">
                {children}
            </div>
        </main>
    )
}

export default LandingLayout;