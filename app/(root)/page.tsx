import StartupCard, {StartupTypeCard} from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({ searchParams } : {searchParams: Promise<{ query?: string }>}) {

  const query = (await searchParams).query;
  const posts = await client.fetch(STARTUPS_QUERY)

  return (
    <>
    <section className="pink_container">
        <h1 className="heading">Pitch Your Startup Asshole</h1>
        <p className="sub-heading !max-w-3xl">Submit Your Ideas, Bid on Products and Own Them</p>
        <SearchForm query={query}/>
      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All startups FUCK!!!!! "}
        </p>

        <ul className="mt-7 card_grid">
          {
            posts.length > 0 ? (
              posts.map((post: StartupTypeCard, index: number) => (
                <StartupCard key={post?._id} post={post} />
              ))
            ) : (
              <p className="no-results">No Startup Found</p>
            )
          }
        </ul>
      </section>
    </>
  );
}