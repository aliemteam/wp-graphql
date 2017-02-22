import defaultMutations from './models/mutations';
import defaultQueries from './models/queries';
import defaultSchema from './models/schema';
import WPGraphQL from './wp-graphql';

export {
    defaultMutations as mutations,
    defaultQueries as queries,
    defaultSchema as schema,
};

export {
    Category,
    Comment,
    Media,
    Page,
    PostStatus,
    PostTypeList,
    Post,
    Revision,
    Settings,
    Tag,
    Taxonomy,
    User,
} from './models/types';

export default WPGraphQL;
