import test from 'ava';
import defaultMutations from '../../models/mutations';
import defaultQueries from '../../models/queries';
import bootstrap from './bootstrapPostResolvers';

test('bootstrapPostResolvers', t => {
    const baseResolvers = { mutations: defaultMutations, queries: defaultQueries };
    let postTypes = [
        { name: 'thing', namePlural: 'things', restBase: 'things' },
    ];
    let { mutations, queries } = bootstrap(baseResolvers, postTypes);
    const { thing, things, post, posts } = queries;
    const { addThing, updateThing, deleteThing, addPost, updatePost, deletePost } = mutations;
    t.not(undefined, thing);
    t.not(undefined, things);
    t.not(undefined, addThing);
    t.not(undefined, updateThing);
    t.not(undefined, deleteThing);
    t.not(undefined, post);
    t.not(undefined, posts);
    t.not(undefined, addPost);
    t.not(undefined, updatePost);
    t.not(undefined, deletePost);

    postTypes = [
        { name: 'course', namePlural: 'courses', restBase: 'courses' },
        { name: 'quiz', namePlural: 'quizzes', restBase: 'quizzes' },
    ];
    ({ mutations, queries } = bootstrap(baseResolvers, postTypes));
    const { course, courses, quiz, quizzes } = queries;
    const { addCourse, updateCourse, deleteCourse, addQuiz, updateQuiz, deleteQuiz } = mutations;
    t.not(undefined, course);
    t.not(undefined, courses);
    t.not(undefined, quiz);
    t.not(undefined, quizzes);
    t.not(undefined, addCourse);
    t.not(undefined, updateCourse);
    t.not(undefined, deleteCourse);
    t.not(undefined, addQuiz);
    t.not(undefined, updateQuiz);
    t.not(undefined, deleteQuiz);
});
