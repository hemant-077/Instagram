import time
from faker import Faker
import requests
import json
import random
import uuid
from datetime import datetime
faker = Faker()


client_id = ""
port_number = '8080'
fake_users_to_generate = 20


def generate(num_user):
    r = requests.get(
        "https://api.unsplash.com/photos/random?client_id={client_id}&orientation=portrait&count={num_user}".format(client_id = client_id, num_user = str(num_user)))
    obj = json.loads(r.text)
    all_users = []
    all_posts = []

    # create users
    for i in range(num_user):
        print('Generating User ' + str(i) + ' ...')
        formData = {}
        name = faker.name()
        userName = name.split(' ')[0] + '_' + name.split(' ')[1] + '_' + str(random.randint(1000, 9999))
        formData['fullName'] = name
        formData['userName'] = userName
        formData['password'] = name.split(' ')[0] + '_' + name.split(' ')[1] + '@password'
        formData['avatar'] = obj[i]['urls']['small_s3']
        formData['email'] = userName + '@example.com'

        requests.post('http://localhost:{port_number}/accounts/signup'.format(port_number = port_number), json.dumps(formData))
        user = requests.get('http://localhost:{port_number}/users/username/{userName}'.format(port_number = port_number, userName = userName))

        try:
            userId = json.loads(user.text)['userId']
            userName = json.loads(user.text)['userName']
            userAvatar = json.loads(user.text)['avatar']
        except:
            print()
        all_users.append([userId, userName, userAvatar])
        current_user_photo_num = random.randint(10, 30)
        r2 = requests.get(
            "https://api.unsplash.com/photos/random?client_id={client_id}&orientation=landscape&count=".format(client_id = client_id) + str(
                current_user_photo_num))
        obj2 = json.loads(r2.text)
        time.sleep(1)

        # generate random(10-30) posts for each user
        for j in range(current_user_photo_num):
            postFormData = {}

            location = obj2[j]['location']['title']
            if location == 'None':
                location = ''

            identifier = uuid.uuid4().hex[-1:-13:-1]

            postFormData['postIdentifier'] = identifier
            postFormData['imageUrl'] = obj2[j]['urls']['regular']
            postFormData['userId'] = userId
            postFormData['postDate'] = obj2[j]['created_at']
            postFormData['postLocation'] = location
            postFormData['postCaption'] = str(obj2[j]['description'])
            postFormData['postAlt'] = str(obj2[j]['alt_description'])
            postFormData['postComments'] = 0
            postFormData['postLikes'] = 0
            postFormData['allowComment'] = 0
            postFormData['allowLike'] = 0

            print(postFormData)

            requests.post('http://localhost:{port_number}/posts/new'.format(port_number = port_number), json.dumps(postFormData))

            post = requests.get('http://localhost:{port_number}/posts/identifier/'.format(port_number = port_number) + identifier)

            try:
                postId = json.loads(post.text)['postId']
                all_posts.append(postId)
            except:
                print('no post_id')

    print("generating fake follows...")
    for k in all_users:
        for n in random.sample(all_users, random.randint(5, 15)):
            follow_form_data = {
                'followerId': k[0],
                'followeeId': n[0],
                'followTimestamp': datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
            }
            if k[0] != n[0]:
                requests.post('http://localhost:{port_number}/follows/follow'.format(port_number = port_number), json.dumps(follow_form_data))

    print("generating fake likes...")
    for k in all_users:
        for n in random.sample(all_posts, random.randint(10, len(all_posts) // 3)):
            like_form_data = {
                'userId': k[0],
                'postId': n,
                'userName': k[1],
                'userAvatar': k[2],
                'likeTimestamp': datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
            }
            requests.post('http://localhost:{port_number}/likes/like'.format(port_number = port_number), json.dumps(like_form_data))

    print("generating fake saves...")
    for k in all_users:
        for n in random.sample(all_posts, random.randint(1, len(all_posts) // 6)):
            save_form_data = {
                'userId': k[0],
                'postId': n,
                'saveTimestamp': datetime.now().strftime("%Y-%m-%dT%H:%M:%S.000Z")
            }
            requests.post('http://localhost:{port_number}/saves/save'.format(port_number = port_number), json.dumps(save_form_data))

    print("done")


if __name__ == '__main__':
    generate(fake_users_to_generate)  # how many fake users you want to generate
